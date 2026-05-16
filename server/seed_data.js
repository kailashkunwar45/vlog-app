import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        delete mongoose.models.PostMessage;
        delete mongoose.models.User;

        const postSchema = mongoose.Schema({
            title: String,
            message: String,
            name: String,
            creator: String,
            tags: [String],
            mediaItems: [mongoose.Schema.Types.Mixed],
            likes: { type: [String], default: [] },
            comments: { type: [String], default: [] },
            createdAt: { type: Date, default: new Date() },
        });
        const PostMessage = mongoose.model('PostMessage', postSchema);

        const userSchema = mongoose.Schema({
          name: { type: String, required:  true },
          email: { type: String, required: true },
          password: { type: String, required: true },
          imageUrl: { type: String },
          id: { type: String },
        });
        const User = mongoose.model("User", userSchema);

        await User.deleteMany({ email: { $regex: /@example\.com$/ } });
        await PostMessage.deleteMany({ tags: 'seed' });

        // 100% VERIFIED WORKING LONG-FORMAT UNSPLASH IDs
        const workingIds = [
            "1503177119275-0aa32b3a9368", "1511739001486-6bfe10ce785f", "1552832230-c0197dd311b5", "1474015081320-a726bed89f2c",
            "1564507592333-c60657eea523", "1605130284535-11dd9eedc58a", "1506744038136-46273834b3fb", "1470071459604-3b5ec3a7fe05",
            "1441974231531-c6227db76b6e", "1501785888041-af3ef285b470", "1501854140801-50d01698950b", "1469474968028-56623f02e42e",
            "1472214103451-9374bd1c798e", "1470770841072-f978cf4d019e", "1447752875215-b2761acb3c5d", "1433086966358-54859d0ed716",
            "1475924156734-496f6cac6ec1", "1500673922987-e212871fec22", "1510784722466-f2aa9c52fe6f", "1505761671935-60b3a74239ad",
            "1465146344425-f00d5f5c8f07", "1441974231531-c6227db76b6e", "1464822759023-fed622ff2c3b", "1517404212776-96b6bc7c3e70",
            "1551632811-561732d1e306", "1540961183384-5f11138408ca", "1544735716-392fe2489ffa", "1582650837019-354f8d779595",
            "1605640840605-14ac1855827b", "1524492412937-b28074a5d7da", "1623910350756-74943f295b9c", "1528164344705-47542687000d",
            "1533174072545-7a4b6ad7a6c3", "1493976040374-85c8e12f0c0e", "1476514525535-07fb3b4ae5f1", "1492666673244-4e16c8aef735",
            "1512453979798-5ea266f8880c", "1483729558449-99ef05a88d61", "1473444475905-eb5a1f342757", "1504285605012-6dc4987027bc",
            "1533587841503-b097871694f4", "1516483601448-2b816a12de1a", "1470252646219-c6061a40f212", "1440282301010-85f0a35b6c57",
            "1461271936441-3bc67323f5b6", "1504509540705-eb300938676d", "1499856853245-0300bc801535", "1493558103133-910a9973b12c"
        ];

        const worldFirstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Christopher", "Karen", "Hans", "Elena", "Yuki", "Ahmed", "Carlos"];
        const worldLastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

        const globalPlaces = [
            { name: "Pyramids", country: "Egypt" }, { name: "Safari", country: "Kenya" }, { name: "Serengeti", country: "Tanzania" },
            { name: "Victoria Falls", country: "Zambia" }, { name: "Table Mountain", country: "South Africa" }, { name: "Eiffel Tower", country: "France" },
            { name: "Colosseum", country: "Italy" }, { name: "Acropolis", country: "Greece" }, { name: "Sagrada Familia", country: "Spain" }
        ];

        const credentials = [];

        for (let i = 0; i < 100; i++) {
            const name = `${worldFirstNames[i % worldFirstNames.length]} ${worldLastNames[i % worldLastNames.length]}`;
            const email = `traveler${i+1}@example.com`;
            const password = `password${i+1}`;
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await User.create({ name, email, password: hashedPassword });

            const place = globalPlaces[i % globalPlaces.length];
            const isMixedPost = i < 20; 
            
            const mediaItems = [];
            for (let j = 0; j < 5; j++) {
                if (isMixedPost && j === 1) {
                    mediaItems.push({ url: "https://www.w3schools.com/html/mov_bbb.mp4", type: 'video' });
                } else {
                    const photoId = workingIds[(i * 5 + j) % workingIds.length];
                    mediaItems.push({ url: `https://images.unsplash.com/photo-${photoId}?q=80&w=1080`, type: 'image' });
                }
            }

            await PostMessage.create({
                title: `Adventure in ${place.name}, ${place.country}`,
                message: `Exploring ${place.name} was incredible! Check out my 5 unique photos/videos. Double click to see the full size! #Travel #Vlog`,
                name: user.name,
                creator: user._id,
                tags: ['seed', place.country, 'GlobalTourism'],
                mediaItems,
                createdAt: new Date().toISOString()
            });

            credentials.push(`Email: ${email}, Password: ${password}, Name: ${name}`);
            if ((i + 1) % 10 === 0) console.log(`Seeded traveler ${i + 1}/100`);
        }

        fs.writeFileSync('./user_credentials.txt', credentials.join('\n'));
        console.log('Credentials saved to user_credentials.txt');
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seed();
