import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

interface JwtPayload {
    user_id: number;
    username: string;
    uloga: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json( { success: false, message: "Nedostaje token"});
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayload;

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Token nije validan"});
    }
}