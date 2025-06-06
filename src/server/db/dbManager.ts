import pgPromise from "pg-promise";
import { createUserTableIfNotExists } from "./schema/usersTable";
import { createPostsTableIfNotExists } from "./schema/postsTable";
import { createCommentsTableIfNotExists } from "./schema/commentsTable";
import { createInsertCommentFunction } from "./model/postModel";

class DBManager {
  pgp = pgPromise();
  host = "localhost";
  user = process.env.PSQL_USER;
  port = Number(process.env.PSQL_PORT);
  password = process.env.PSQL_PASS;
  dbName = 'samimr';

  adminDb = this.pgp({
    host: this.host,
    port: this.port,
    database: this.user,
    user: this.user,
    password: this.password,
  });

  db = this.pgp({
    host: this.host,
    port: this.port,
    database: this.dbName,
    user: this.user,
    password: this.password,
  });

  private static dbManager: DBManager | null = null;

  private async createDatabaseIfNotExists() {
    const dbExists = await this.adminDb.oneOrNone(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [this.dbName]
    );

    if (!dbExists) {

      await this.adminDb.none(`CREATE DATABASE $1:name WITH ENCODING 'UTF8' TEMPLATE template0`, [this.dbName]);
      console.log(`Database ${this.dbName} created`);
    } else {
      console.log(`Database ${this.dbName} already exists`);
    }
  }

  async init_db() {
    try {
      await this.createDatabaseIfNotExists();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async init_functions() {
    try {
      await createInsertCommentFunction(this.db);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async init_schema() {
    try {
      await createUserTableIfNotExists(this.db);
      await createPostsTableIfNotExists(this.db);
      await createCommentsTableIfNotExists(this.db);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public static getDBManager(): DBManager {
    if (DBManager.dbManager == null) {
      DBManager.dbManager = new DBManager();
    }
    return DBManager.dbManager;
  }
}



export default DBManager;
