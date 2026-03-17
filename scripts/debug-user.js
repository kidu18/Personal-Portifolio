const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

async function checkUser() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db();
        const users = await db.collection("User").find({}).toArray();
        console.log("------------------------------------------");
        console.log(`Found ${users.length} users:`);
        users.forEach(u => {
            console.log(`- Email: ${u.email}, Role: ${u.role}, Password is hashed: ${u.password.startsWith('$2a$')}`);
        });
        console.log("------------------------------------------");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

checkUser();
