import jwt from "jsonwebtoken";


const secret = process.env.JWT_SECRET || "secret";


export function generateToken(
    payload: object
){

    return jwt.sign(
        payload,
        secret,
        {
            expiresIn:"7d"
        }
    );

}



export function verifyToken(
    token:string
){

    return jwt.verify(
        token,
        secret
    );

}