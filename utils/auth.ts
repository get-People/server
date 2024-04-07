import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';


function extractAccessToken(req: Request): string | null {
    if (req.headers.cookie) {
        const cookiesParts = req.headers.cookie.split(';');
       const accessTokenPart = cookiesParts.find(cookie => {
            const [name,value] = cookie.trim().split('=');
            if(name === 'access token') return value;
       })
        if (accessTokenPart) {
            const [, accessToken] = accessTokenPart.trim().split('=');
            return accessToken;
        }
    }
    return null;
}
export const verifyToken = (req: Request, res: Response, next: () => any) => {
    if (req.headers.cookie) {
        const token = extractAccessToken(req);
        if (!token) return res.status(401).send({ message: "no token provided" });
        try {
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN as string);
            req.body.user = decodedToken;
            return next();
        }
        catch (error) {
            return res.status(401).send({ message: "Unauthorized" });
        }
    }
    return res.status(401).send({ message: "Unauthorized" });
}

export const isAdmin = (req: Request, res: Response, next: () => any) => {
    if (req.body.user.isAdmin) return next();
    return res.status(401).send({ message: "forbidden" });
}