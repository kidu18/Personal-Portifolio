require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

async function main() {
  if (!uri) {
    console.error("MONGODB_URI is missing in environment variables");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db();

    const adminEmail = "admin@example.com";
    const adminPassword = "adminpassword123"; // In production, use hashed passwords!

    const result = await db.collection("User").updateOne(
      { email: adminEmail },
      {
        $set: {
          email: adminEmail,
          password: adminPassword,
          name: "Admin User",
          role: "admin",
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    console.log("Admin user upserted:", result);
  } catch (e) {
    console.error("Error seeding database:", e);
  } finally {
    await client.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
