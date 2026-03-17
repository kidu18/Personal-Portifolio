import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();

        const user = await db.collection("User").findOne({ email });

        if (!user) {
            // We return success even if user not found to prevent email enumeration
            return NextResponse.json({ message: "If an account exists, a reset link has been sent." });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour

        await db.collection("User").updateOne(
            { _id: user._id },
            {
                $set: {
                    resetToken,
                    resetTokenExpiry,
                }
            }
        );

        // In production, send email here. For now, log the link.
        const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
        console.log("------------------------------------------");
        console.log(`PASSWORD RESET REQUEST FOR: ${email}`);
        console.log(`RESET LINK: ${resetLink}`);
        console.log("------------------------------------------");

        return NextResponse.json({ message: "If an account exists, a reset link has been sent." });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
