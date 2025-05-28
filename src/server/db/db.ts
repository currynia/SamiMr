import pgPromise from "pg-promise"

const pgp = pgPromise();
const host = "localhost";
const user = process.env.PSQL_USER;
const port = Number(process.env.PSQL_PORT);
const password = process.env.PSQL_PASS;
const dbName = 'proext'

const adminDb = pgp({
  host,
  port,
  database: user,
  user,
  password,
});

async function createDatabaseIfNotExists() {

  const dbExists = await adminDb.oneOrNone(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [dbName]
  );

  if (!dbExists) {

    await adminDb.none(`CREATE DATABASE $1:name`, [dbName]);
    console.log(`Database ${dbName} created`);
  } else {
    console.log(`Database ${dbName} already exists`);
  }
}

async function main() {
  try {
    await createDatabaseIfNotExists();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    pgp.end();
  }
}

await main();

export const db = pgp({ host,
  port,
  database: dbName,
  user,
  password,});




