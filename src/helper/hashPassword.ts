const password = '111111';
const hashedPassword = await Bun.password.hash(password);

export {};