import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  offer: number;
  category: string;
  boughtQuantity: number;
  stock: number;
  tags: string[];
  priority: number;
  expiryDate?: Date;
  imageUrls: string[];
  slug: string;
  material: string;
  weight: string;
  purity: string;
  occasion: string;
  isTrending: boolean;
  discountedPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [false, "Description is optional"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    material: {
      type: String,
      trim: true,
    },
    weight: {
      type: String,
      trim: true,
    },
    purity: {
      type: String,
      trim: true,
    },
    occasion: {
      type: String,
      trim: true,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: Number,
      default: 0,
      min: [0, "Offer cannot be negative"],
      max: [100, "Offer cannot exceed 100%"],
    },
    stock: {
      type: Number,
      default: 1,
      min: [0, "Stock cannot be negative"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    priority: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
      required: false,
    },
    imageUrls: {
      type: [String],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0 && v.every(url => url.trim().length > 0);
        },
        message: "A product must have at least one valid image URL"
      }
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ tags: 1 });

productSchema.pre("save", function (this: IProduct, next) {
  if (this.name && (this.isModified("name") || !this.slug)) {
    this.slug = this.name
      .toLowerCase()
      .split(" ")
      .join("-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

productSchema.virtual("discountedPrice").get(function (this: IProduct) {
  return this.price - (this.price * this.offer) / 100;
});

export default mongoose.model<IProduct>("Product", productSchema);
