import { type Context } from "elysia";
import { loginService } from "../services/authServices";
import { generateRandomString } from "../helper/genRandomString";
import { REFRESHTOKEN_TTL } from "../constants/time";
import { saveRefreshToken } from "../services/authServices";
import * as jose from "jose";

const getToken = async(payload: jose.JWTPayload, expiry?: string) => {
    const signJwt = new jose.SignJWT(payload).setProtectedHeader({
        alg: "HS256",
    });
    if (expiry) {
        signJwt.setExpirationTime(expiry);
    }
    return await signJwt.sign(new TextEncoder().encode(Bun.env.JWT_SECRET));
};

export const loginHandler = async (ctx: Context) => {
    const { body, set } = ctx;

    const { email, password } = body as {
        email: string;
        password: string;
    };

    const result = await loginService(email, password);

    if (result.error) {
        set.status = result.status;
        return { error: result.error };
    }

    const user = result.data!;

    const accessToken = await getToken(user, "15m");

    const refreshToken = await generateRandomString();
    const isSaved = await saveRefreshToken(
        user.id,
        refreshToken,
        new Date(Date.now() + REFRESHTOKEN_TTL)
    );

    if (isSaved.error) {
        set.status = isSaved.status;
        return { error: isSaved.error };
    }

    return {
        accessToken,
        refreshToken,
    }
}