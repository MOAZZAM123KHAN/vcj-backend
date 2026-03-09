import mongoose, { Schema, Document } from "mongoose";

export interface IReel extends Document {
    title: string;
    reelUrl: string;
    thumbnailUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

const reelSchema = new Schema<IReel>(
    {
        title: {
            type: String,
            required: [true, "Please add a title"],
            trim: true,
        },
        reelUrl: {
            type: String,
            required: [true, "Please add an Instagram Reel URL"],
            trim: true,
        },
        thumbnailUrl: {
            type: String,
            required: [true, "Please add a thumbnail URL"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IReel>("Reel", reelSchema);
