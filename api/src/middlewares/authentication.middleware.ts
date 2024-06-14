import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Request, Response } from "express";
import {User} from '../models/User';


export const authentication = (req: Request, res: Response, next: Function) => {
    if (!req.body.phone_number) {
        return res.status(400).json({
            message: "Phone Number is required!",
        });
    }
    if (!req.body.password) {
        return res.status(400).json({
            message: "Password required!",
        });
    }

    console.log("above strategy")

    passport.authenticate('local', { session: false }, (error: any, user: any, info: any) => {
        console.log("error log")
        console.log("ERROR >>>  ", error);
        if (error) {
            return res.status(500).send(error);
        } else if (!user) {
            return res
                .status(401)
                .json({ message: "Login Failed: Invalid Phone Number or password!" });
        } else {
            req.logIn(user, { session: false }, (error) => {
                console.log("ER >>>  ", error);
                if (error) {
                    return res
                        .status(401)
                        .json({ message: "Login Failed: Invalid Phone number or password!" });
                } else {
                    console.log("success", user)
                    req.user = user;
                    console.log(req);
                }
                next();
            });
        }
    })(req, res, next);
};

export const response = (req: any, res: Response) => {
    let user: User = req.user;
    res.status(200).json({
        token: req.token,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        id: user.id,
    });
};


export const authenticateHeader = (
    req: Request,
    res: Response,
    next: Function
) => {
    const authentication_header = req.headers.authorization;
    const token = authentication_header && authentication_header.split(" ")[1];
    if (token == null) return res.status(401).json({error:"Token not provided!"});

    jwt.verify(
        token,
        process.env.TOKEN_KEY,
        (error, user:User) => {
            if (error) {
                return res.status(403).json({error:"Invalid token!"});
            }
            req.user = user;
            next();
        }
    );
};


export const protect = async (req: Request, res: Response, next: Function) => {
    let token: string
    let decoded: any
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1]
            // Verify token
            decoded = jwt.verify(token, process.env.TOKEN_KEY)
            // Get user from the token
            req.user = await User.findOne({ where: { id: decoded.id } })
            next()
        } catch (error) {
            res.status(401).json({
                message: "User is not authenticated.",
            })
        }
    }

    if (!token) {
        res.status(401).json({
            message: "Not authorized, no token"
        })
    }
}

export const generateToken = (req: any, res: Response, next: Function) => {
    let user: any = req.user;
    req.token = jwt.sign(
        {
            id: user.id,
            phone_number: user.phone_number,
        },
        process.env.TOKEN_KEY
    );

    next();
};

