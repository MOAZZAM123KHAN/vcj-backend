
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://moazzam575khan_db_user:kYj8ytDbEu1RJETz@cluster0.ux8kerp.mongodb.net/?appName=Cluster0";

async function checkAndFixData() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const ProductSchema = new mongoose.Schema({
            name: String,
            imageUrls: [String],
            stock: Number,
            boughtQuantity: Number,
            price: Number,
            category: String
        }, { strict: false });

        const Product = mongoose.model('Product', ProductSchema);

        const products = await Product.find({});
        console.log(`Found ${products.length} products to check.`);

        const placeholder = "/images/jwellry CDN 1.jpg"; // Using an existing local image

        for (const p of products) {
            let updates = {};
            let needsUpdate = false;

            // 1. Fix missing/empty imageUrls
            if (!p.imageUrls || p.imageUrls.length === 0 || p.imageUrls.every(url => !url || url.trim() === "")) {
                updates.imageUrls = [placeholder];
                needsUpdate = true;
                console.log(`Fixing image for product: ${p.name || p._id}`);
            }

            // 2. Ensure stock is a number
            if (p.stock === undefined || p.stock === null || isNaN(p.stock)) {
                updates.stock = 1;
                needsUpdate = true;
            }

            // 3. Ensure boughtQuantity is a number
            if (p.boughtQuantity === undefined || p.boughtQuantity === null || isNaN(p.boughtQuantity)) {
                updates.boughtQuantity = 0;
                needsUpdate = true;
            }

            if (needsUpdate) {
                await Product.findByIdAndUpdate(p._id, updates);
            }
        }

        console.log("Data consistency check complete.");
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkAndFixData();
