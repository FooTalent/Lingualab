import bcrypt from 'bcrypt';

export const createHashAsync = async psw => await bcrypt.hash(psw, await bcrypt.genSalt(10));

export const isValidPasswordAsync = async (psw, user) => await bcrypt.compare(psw, user.password)