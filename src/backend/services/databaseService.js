import path from "node:path";
import { JSONFilePreset } from "lowdb/node";

export default class databaseService {
    static #db = {};

    static async init() {
        const defaultData = {
            memeCount: 0
        };

        const DB_PATH = path.join(import.meta.dirname, "../db.json");

        this.#db = await JSONFilePreset(DB_PATH, defaultData);
        await this.#db.write();
    }

    static async get(key) {
        await this.#db.read();

        return this.#db.data[key];
    }

    static async set(key, value) {
        this.#db.data[key] = value;
        await this.#db.write();
    }
}