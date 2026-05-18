import mongoose, { Schema, Document } from "mongoose";

export interface IGoldRate extends Document {
    gold18k: number;
    gold22k: number;
    gold24k: number;

    date: string;

    createdAt: Date;
    updatedAt: Date;
}

const goldRateSchema = new Schema<IGoldRate>(
    {
        gold18k: {
            type: Number,
            required: [true, "Please add 18k gold rate"],
        },

        gold22k: {
            type: Number,
            required: [true, "Please add 22k gold rate"],
        },

        gold24k: {
            type: Number,
            required: [true, "Please add 24k gold rate"],
        },

        date: {
            type: String,
            required: [true, "Please add gold rate date"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IGoldRate>(
    "GoldRate",
    goldRateSchema
);