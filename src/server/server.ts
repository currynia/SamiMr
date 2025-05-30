import { fileURLToPath, URL } from 'node:url'
import express from 'express'
import 'dotenv/config'
import DBManager from "./db/dbManager"

const app = express()
const port = 3000
const dbManager = DBManager.getDBManager();
app.use(express.json());
app.use(express.static(fileURLToPath(new URL('../client/dist/', import.meta.url))))
app.get('/', (req, res) => {
  res.sendFile(fileURLToPath(new URL('../client/dist/index.html', import.meta.url)))
})

app.post('/api/auth/login', (req, res) => {
  console.log(`got ${req}  ${res}`)
})

app.post('/api/auth/register', (req, res) => {
  console.log(`got register`, req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


await dbManager.init_db();
await dbManager.init_schema();



