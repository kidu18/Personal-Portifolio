import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./mongodb";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const logDebug = (msg: string) => {
  try {
    const logPath = path.join(process.cwd(), "debug-auth.log");
    fs.appendFileSync(logPath, `${new Date().toISOString()}: ${msg}\n`);
  } catch (e) { }
};

// You should add NEXTAUTH_SECRET to your .env file
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const email = credentials.email.toLowerCase().trim();
        const password = credentials.password;

        console.error(">>> AUTH DEBUG: Authorize attempt for:", email);
        const client = await clientPromise;
        const db = client.db("portfolio");

        const user = await db.collection("User").findOne({
          email: email,
        });

        console.log("User found in DB:", user ? "Yes" : "No");

        if (!user) {
          console.error(">>> AUTH DEBUG: User not found in database:", email);
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          console.error(">>> AUTH DEBUG: Password mismatch for:", email);
          throw new Error("Invalid email or password");
        }

        console.error(">>> AUTH DEBUG: Login successful for:", email);

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        logDebug(`JWT callback: setting token for ${user.email}`);
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        logDebug(`Session callback: setting user ${session.user.email}`);
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
