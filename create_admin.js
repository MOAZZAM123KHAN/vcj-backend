
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGODB_URI = "mongodb+srv://moazzam575khan_db_user:kYj8ytDbEu1RJETz@cluster0.ux8kerp.mongodb.net/?appName=Cluster0";

async function createAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const UserSchema = new mongoose.Schema({
            name: String,
            phoneNumber: String,
            password: String,
            role: String,
            emailAddress: String
        }, { strict: false });

        const User = mongoose.model('User', UserSchema);

        const mobile = "9079590795"; // Stored without spaces for consistency
        const password = "vcjAdmin123";

        // Check if exists
        const existing = await User.findOne({ phoneNumber: mobile });
        if (existing) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await User.create({
            name: "Vimal Chhaganlal Admin",
            phoneNumber: mobile,
            password: hashedPassword,
            role: "admin",
            emailAddress: "admin@vcjjewellers.com"
        });

        console.log("Admin account created successfully:", mobile);
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

createAdmin();
