import jwt, { SignOptions, Algorithm } from 'jsonwebtoken';
import crypto from 'crypto';

type JwtServiceOptions = {
    privateKey: string;
    publicKey: string
    algorithm?: Algorithm;
}

export class JwtService {
    private privateKey: string;
    private publicKey: string;
    private algorithm: Algorithm;

    constructor( { publicKey, privateKey, algorithm = "RS256" }: JwtServiceOptions ) {
        if(!publicKey || !privateKey){
            throw new Error("JWTs must be provide")
        };
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.algorithm = algorithm;
    }

    generateAccessToken(payload: Record <string, any>, expiresInSecond: number): string {
        const options: SignOptions = {
            algorithm: this.algorithm,
            expiresIn: expiresInSecond || 300}
        return jwt.sign(payload, this.privateKey, options)
    }

    verifyAccessToken (token: string): any {
        return jwt.verify(token, this.publicKey, { algorithms: [this.algorithm] })
    }

    generateRefreshToken(payload: Record <string, any>, expiresInSecond: number): string {
        const options: SignOptions = {
            algorithm: this.algorithm,
            expiresIn: expiresInSecond || 604800
        }
        return jwt.sign(payload, this.privateKey, options)
    }

    verifyRefreshToken(token: string): any {
        return jwt.verify(token, this.publicKey, { algorithms: [this.algorithm] })
    }

    generateJit(): string {
        return crypto.randomUUID()
    }

}
































//     generateAccessToken(payload: Record<string, any>, expiresInSeconds?: number): string {
//         const options: SignOptions = {
//             algorithm: this.algorithm,
//             expiresIn: expiresInSeconds || 300,
//         }
//         return jwt.sign(payload, this.privateKey, options)
//     }

//     verifyAccessToken(token: string): any {
//         return jwt.verify(token, this.publicKey, { algorithms: [this.algorithm] });
//     }
//     generateJit(): string {
//         return crypto.randomUUID();
//     }
// }
