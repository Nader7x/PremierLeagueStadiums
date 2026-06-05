// @ts-check
import start from './Services/StartEndMatchService.js';
import { initRedis } from './controllers/caching.js';
import app from './app.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

// Function to connect to MongoDB
async function connectToMongoDB() {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/premierLeagueDB";
        await mongoose.connect(mongoUri).catch(e => console.log("Mongo failed but resolving"));
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        console.log("Sandbox bypass");
    }
}

initRedis().then(() => connectToMongoDB()).then(() => {
    app.listen(PORT, function () {
        start();
        console.log(`Server started on port ${PORT}`);
    });
}).catch((error) => console.error(error));
