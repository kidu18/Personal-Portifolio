const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Ensure dotenv is installed if not already

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

async function hashPasswords() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to database");

        const db = client.db("portfolio");
        const users = await db.collection("User").find({}).toArray();

        for (const user of users) {
            if (!user.password.startsWith("$2a$")) { // Check if not already hashed (bcrypt hashes start with $2a$)
                console.log(`Hashing password for user: ${user.email}`);
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await db.collection("User").updateOne(
                    { _id: user._id },
                    { $set: { password: hashedPassword } }
                );
                console.log(`Password updated for ${user.email}`);
            } else {
                console.log(`Password already hashed for ${user.email}`);
            }
        }

        console.log("Password migration complete.");
    } catch (error) {
        console.error("Error migrating passwords:", error);
    } finally {
        await client.close();
    }
}

hashPasswords();
