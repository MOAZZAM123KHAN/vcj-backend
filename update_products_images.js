
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://moazzam575khan_db_user:kYj8ytDbEu1RJETz@cluster0.ux8kerp.mongodb.net/?appName=Cluster0";

const localImages = [
    "/images/jwellry CDN 1.jpg",
    "/images/jwellry CDN2.jpg",
    "/images/jwellry cdn 3.jpg"
];

async function updateProducts() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const ProductSchema = new mongoose.Schema({
            name: String,
            imageUrls: [String]
        }, { strict: false });

        const Product = mongoose.model('Product', ProductSchema);

        const products = await Product.find({});
        console.log(`Found ${products.length} products`);

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const hasUnsplash = product.imageUrls && product.imageUrls.some(url => url && (url.includes('unsplash.com') || url.includes('http')));

            if (hasUnsplash || !product.imageUrls || product.imageUrls.length === 0) {
                // Replace with local images round-robin
                const newImages = [localImages[i % localImages.length]];
                await Product.findByIdAndUpdate(product._id, { imageUrls: newImages });
                console.log(`Updated product ${product._id} (${product.name || 'unnamed'})`);
            } else {
                console.log(`Skipping product ${product._id} (${product.name || 'unnamed'}) - already has valid image or non-unsplash link`);
            }
        }

        console.log("Update complete");
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

updateProducts();
