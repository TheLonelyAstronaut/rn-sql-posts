export const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    avatar TEXT NOT NULL,
    CONSTRAINT uc_users UNIQUE (username,email)
  );
`;

export const FIND_USER_WITH_DATA = `SELECT id, username, email FROM users WHERE username=$username OR email=$email;`;

export const VERIFY_USER = `SELECT id, username, email, avatar FROM users WHERE username=$username AND password_hash=password_hash AND email=$email;`;

export const CREATE_USER = `INSERT INTO users (id, email, username, password_hash, avatar) VALUES ($id, $email, $username, $password_hash, $avatar);`;

export const GET_USER_BY_ID = `SELECT id, username, email, avatar FROM users WHERE id=$id;`;
