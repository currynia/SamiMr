import type { DB } from "../types";
import { errors } from "pg-promise";


export function registerModel(db:DB, username: string, password: string) {

    db.none("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password])

}
