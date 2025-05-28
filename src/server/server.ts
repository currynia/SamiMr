import { fileURLToPath, URL } from 'node:url'
import express from 'express'
import 'dotenv/config'
import {db} from "./db/db"

const app = express()
const port = 3000
db.connect();

app.use(express.static(fileURLToPath(new URL('../client/dist/', import.meta.url))))
app.get('/', (req, res) => {
  res.sendFile(fileURLToPath(new URL('../client/dist/index.html', import.meta.url)))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
