
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://moazzam575khan_db_user:kYj8ytDbEu1RJETz@cluster0.ux8kerp.mongodb.net/?appName=Cluster0";

async function checkAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const UserSchema = new mongoose.Schema({
            phoneNumber: String,
            role: String,
            name: String
        }, { strict: false });

        const User = mongoose.model('User', UserSchema);

        const allUsers = await User.find({});
        console.log("Total users found:", allUsers.length);
        console.log("All users:", JSON.stringify(allUsers, null, 2));

        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkAdmin();
