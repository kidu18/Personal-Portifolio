require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;

async function checkUser() {
  if (!uri) {
    console.error("DATABASE_URL is missing");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db();

    const user = await db
      .collection("User")
      .findOne({ email: "admin@example.com" });

    if (user) {
      console.log("User FOUND.");
      console.log("Email:", user.email);
      console.log("Password:", user.password);
      console.log("Role:", user.role);
    } else {
      console.log("User admin@example.com NOT found");
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

checkUser();
