import * as SQLite from "expo-sqlite";

let dbPromise = SQLite.openDatabaseAsync("contacts.db");

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  birthdate: string;
}

export interface Contact {
  id: number;
  added_by: number;
  name: string;
  email: string;
  contact_no: string;
}

interface TableRow {
  name: string;
  sql?: string;
}

export const initDB = async (): Promise<void> => {
  const db = await dbPromise;

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            birthdate TEXT
        );

        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY NOT NULL,
            added_by INTEGER,
            name TEXT,
            email TEXT,
            contact_no TEXT unique,
            FOREIGN KEY(added_by) REFERENCES users(id)
        );
    `);
};

export const showTables = async (): Promise<void> => {
  try {
    const db = await dbPromise;
    const rows: TableRow[] = await db.getAllAsync(
      "SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
    );
    console.log(
      "Existing tables:",
      rows.map((t) => t.name),
    );
  } catch (error) {
    console.error("error: ", error);
  }
};

export const insertUser = async (
  name: string,
  email: string,
  password: string,
  birthdate: string,
): Promise<void> => {
  const db = await dbPromise;

  await db.runAsync(
    `INSERT INTO users (name, email, password, birthdate) VALUES (?, ?, ?, ?)`,
    name,
    email,
    password,
    birthdate,
  );
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<User | undefined> => {
  const db = await dbPromise;

  const user = await db.getFirstAsync(
    `SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1`,
    email,
    password,
  );

  return user as User | undefined;
};

export const insertContact = async (
  added_by: number,
  name: string,
  email: string,
  contact_no: string,
): Promise<number> => {
  const db = await dbPromise;

  const result = await db.runAsync(
    `INSERT INTO contacts (added_by, name, email, contact_no) VALUES (?, ?, ?, ?)`,
    added_by,
    name,
    email,
    contact_no,
  );

  return result.lastInsertRowId;
};

export const getContactsByUser = async (id: number): Promise<Contact[]> => {
  const db = await dbPromise;

  return await db.getAllAsync(`SELECT * FROM contacts WHERE added_by = ?`, id);
};
