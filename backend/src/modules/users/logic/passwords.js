import bcrypt from 'bcrypt';

export const createHashAsync = async psw => await bcrypt.hash(psw, await bcrypt.genSalt(10));

export const isValidPasswordAsync = async (psw, psw2) => await bcrypt.compare(psw, psw2)