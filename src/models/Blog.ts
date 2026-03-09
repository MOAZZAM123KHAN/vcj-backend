import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    excerpt: {
      type: String,
      required: [false, "Please add an excerpt"],
    },
    content: {
      type: String,
      required: [true, "Please add  content"],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.pre("validate", function (this: IBlog, next) {
  if (this.title && (this.isModified("title") || !this.slug)) {
    this.slug = this.title
      .toLowerCase()
      .split(" ")
      .join("-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

export default mongoose.model<IBlog>("Blog", blogSchema);
