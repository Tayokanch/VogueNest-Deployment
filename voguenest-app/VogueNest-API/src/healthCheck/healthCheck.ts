import { Request, Response } from "express";

export const healthCheckController = async (req: Request, res: Response) => {
    try {
        return res.status(200).send("Server is up and running");
    } catch (err) {
        console.error(err);
        return res.status(400);
    }
};
