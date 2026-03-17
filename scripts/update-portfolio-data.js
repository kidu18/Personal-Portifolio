const { MongoClient } = require('mongodb');

async function run() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('portfolio');

        // Update Global Settings
        const profileUpdate = {
            $set: {
                'profile.title': 'Full-Stack Developer | Founder of Rokina Startup',
                'profile.bio': 'I combine technical expertise with entrepreneurial execution — delivering digital products strategically aligned with business growth.',
                'updatedAt': new Date()
            }
        };
        const settingsResult = await db.collection('settings').updateOne({ _id: 'global-settings' }, profileUpdate);
        console.log(`Settings updated: ${settingsResult.modifiedCount} document(s) modified.`);

        // Clear existing projects and add new ones (based on the About Me content)
        // Note: In a real scenario we might want to keep some, but here we were instructed to "change any content"
        await db.collection('projects').deleteMany({});

        const newProjects = [
            {
                title: 'Habesha Dress E-Commerce Platform',
                description: 'Designed and developed a full-scale online shopping platform tailored for traditional fashion commerce. Optimized for performance and secure payments.',
                link: '#',
                image: '',
                tags: ['MERN', 'Payment Integration', 'Admin Dashboard', 'SEO'],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Guest House Business Website',
                description: 'Developed a booking-ready website to improve online presence and direct customer inquiries. Improved digital visibility and booking flow.',
                link: '#',
                image: '',
                tags: ['Next.js', 'SEO-Optimized', 'Booking Workflow'],
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Personal Portfolio & E-Commerce Platforms',
                description: 'Delivered modern, high-performance websites for global clients, focusing on clean architecture and maintainable TypeScript codebases.',
                link: '#',
                image: '',
                tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        const projectResult = await db.collection('projects').insertMany(newProjects);
        console.log(`Projects updated: ${projectResult.insertedCount} document(s) inserted.`);

        console.log('Database updated successfully');
    } catch (error) {
        console.error('Error updating database:', error);
    } finally {
        await client.close();
    }
}

run();
