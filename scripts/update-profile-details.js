const { MongoClient } = require('mongodb');

async function run() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('portfolio');

        const profileUpdate = {
            $set: {
                'profile.title': 'Full-Stack Developer | Founder of Rokina Startup',
                'profile.bio': 'I combine technical expertise with entrepreneurial execution — delivering digital products strategically aligned with business growth.',
                'profile.avatarUrl': '/uploads/1772008039691_my_img.jpg',
                'profile.email': 'kidkidist87@gmail.com',
                'updatedAt': new Date()
            }
        };
        const settingsResult = await db.collection('settings').updateOne({ _id: 'global-settings' }, profileUpdate);
        console.log(`Settings updated: ${settingsResult.modifiedCount} document(s) modified.`);
        console.log('Database updated successfully with kids email and avatar');
    } catch (error) {
        console.error('Error updating database:', error);
    } finally {
        await client.close();
    }
}

run();
