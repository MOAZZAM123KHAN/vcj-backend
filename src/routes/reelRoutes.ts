import express, { Request, Response } from "express";
import Reel from "../models/Reel";

const router = express.Router();

// Create a new reel
router.post("/", async (req: Request, res: Response) => {
    try {
        const reel = await Reel.create(req.body);
        res.status(201).json({
            success: true,
            data: reel,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Get all reels
router.get("/", async (req: Request, res: Response) => {
    try {
        const reels = await Reel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: reels.length,
            data: reels,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

// Get single reel
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const reel = await Reel.findById(req.params.id);
        if (!reel) {
            return res.status(404).json({
                success: false,
                error: "Reel not found",
            });
        }
        res.status(200).json({
            success: true,
            data: reel,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

// Update reel
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const reel = await Reel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!reel) {
            return res.status(404).json({
                success: false,
                error: "Reel not found",
            });
        }
        res.status(200).json({
            success: true,
            data: reel,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Delete reel
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const reel = await Reel.findByIdAndDelete(req.params.id);
        if (!reel) {
            return res.status(404).json({
                success: false,
                error: "Reel not found",
            });
        }
        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

export default router;
