import * as jwt from "jsonwebtoken";


export function generateToken(params: {id: string, email: string, name: string}, SECRET_KEY: string) {
    const token = jwt.sign(params, SECRET_KEY, {
        expiresIn: '7d'
    })
    return token
}

export function verifyToken(token: string, SECRET_KEY: string) {
    const tkn = jwt.verify(token, SECRET_KEY)
    return tkn
}