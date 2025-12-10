import { randomBytes } from 'crypto'

export const generateRandomString = async (length: number = 64) => {
    return await Bun.password.hash(randomBytes(length).toString('hex'));
}