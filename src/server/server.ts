import { fileURLToPath, URL } from 'node:url';
import express from 'express';
import 'dotenv/config';
import DBManager from "./db/dbManager";
import authRouter from "./router/auth";
import postRouter from './router/posts';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './auth/middleware';

const app = express();
const port = 3000;
const dbManager = DBManager.getDBManager();

app.use(cookieParser());
app.use(express.json());
app.use(express.static(fileURLToPath(new URL('../client/dist/', import.meta.url))));
app.get('/', (req, res) => {
  res.sendFile(fileURLToPath(new URL('../client/dist/index.html', import.meta.url)));
});
app.use("/api/auth", authRouter);
app.use(authMiddleware);
app.use("/api/post", postRouter);
app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});

await dbManager.init_db();
await dbManager.init_schema();
await dbManager.init_functions();



