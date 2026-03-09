
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://moazzam575khan_db_user:kYj8ytDbEu1RJETz@cluster0.ux8kerp.mongodb.net/?appName=Cluster0";

async function tagProducts() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const ProductSchema = new mongoose.Schema({
            tags: [String],
            priority: Number,
            stock: Number,
            offer: Number
        }, { strict: false });

        const Product = mongoose.model('Product', ProductSchema);

        const products = await Product.find({});
        console.log(`Found ${products.length} products`);

        // Tag the first 5 products as curated_exclusive and give them some priority/stock
        for (let i = 0; i < Math.min(products.length, 5); i++) {
            const product = products[i];
            await Product.findByIdAndUpdate(product._id, {
                tags: ['curated_exclusive'],
                priority: (i + 1) * 10,
                stock: 10,
                offer: (i + 1) * 5
            });
            console.log(`Tagged product ${product._id} (${product.name || 'unnamed'})`);
        }

        console.log("Update complete");
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

tagProducts();
