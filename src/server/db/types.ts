import type pgPromise from "pg-promise";
import type pg from "pg-promise/typescript/pg-subset";

export type DB = pgPromise.IDatabase<object,pg.IClient>;
