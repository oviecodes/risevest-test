import express, { Express } from 'express'
import * as dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import routes from './routes/index.js'
import cors from 'cors'
import redis from './connectors/redis.js'

dotenv.config()
const app: Express = express()
const port = process.env.PORT

redis.connect()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 200 * 1024 * 1024 }, //200mb file limit
  })
)

app.use('/', routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
