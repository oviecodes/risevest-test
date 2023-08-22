import express, { Express, Request, Response } from "express"
import * as dotenv from "dotenv"
import fileUpload from "express-fileupload"
import indexRoutes from "./routes/index.js"
import cors from "cors"

dotenv.config()
const app: Express = express()
const port = process.env.PORT

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 200 * 1024 * 1024 }, //200mb file limit
  })
)

app.use("/", indexRoutes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
