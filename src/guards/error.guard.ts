import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(err.statusCode || 500).json({
        error: err.message || "Internal server error"
    });
};