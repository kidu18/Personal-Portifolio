const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
require("dotenv").config();

async function testAuth() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("portfolio");
        const user = await db.collection("User").findOne({ email: "admin@example.com" });

        if (!user) {
            console.log("User not found");
            return;
        }

        const passwordToTest = "adminpassword123";
        const isValid = await bcrypt.compare(passwordToTest, user.password);

        console.log("------------------------------------------");
        console.log("Testing password:", passwordToTest);
        console.log("Stored hash:", user.password);
        console.log("Is valid:", isValid);
        console.log("------------------------------------------");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

testAuth();
