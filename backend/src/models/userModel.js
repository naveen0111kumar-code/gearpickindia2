import db from '../services/db.js';
export const createUser = (user) => { db.users.push(user); return user; };
export const findUserByEmail = (email) => db.users.find((u) => u.email === email);
