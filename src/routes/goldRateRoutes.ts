import express, { Request, Response } from "express";

import GoldRate from "../models/gold-rate";

const router = express.Router();


// Create Gold Rate
router.post("/", async (req: Request, res: Response) => {
    try {
        const goldRate = await GoldRate.create(req.body);

        res.status(201).json({
            success: true,
            data: goldRate,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});


// Get All Gold Rates
router.get("/", async (req: Request, res: Response) => {
    try {
        const goldRates = await GoldRate.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: goldRates.length,
            data: goldRates,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});


// Get Latest Gold Rate
router.get("/latest", async (req: Request, res: Response) => {
    try {
        const goldRate = await GoldRate.findOne().sort({
            createdAt: -1,
        });

        if (!goldRate) {
            return res.status(404).json({
                success: false,
                error: "Gold rate not found",
            });
        }

        res.status(200).json({
            success: true,
            data: goldRate,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});


// Get Single Gold Rate
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const goldRate = await GoldRate.findById(req.params.id);

        if (!goldRate) {
            return res.status(404).json({
                success: false,
                error: "Gold rate not found",
            });
        }

        res.status(200).json({
            success: true,
            data: goldRate,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});


// Update Gold Rate
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const goldRate = await GoldRate.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!goldRate) {
            return res.status(404).json({
                success: false,
                error: "Gold rate not found",
            });
        }

        res.status(200).json({
            success: true,
            data: goldRate,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});


// Delete Gold Rate
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const goldRate = await GoldRate.findByIdAndDelete(
            req.params.id
        );

        if (!goldRate) {
            return res.status(404).json({
                success: false,
                error: "Gold rate not found",
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