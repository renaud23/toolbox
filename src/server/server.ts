import bodyParser from 'body-parser'
import chalk from 'chalk'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const BASE_URI = process.env.VITE_SUGOI_API

const log = console.log
log('SUGOI base path', chalk.magenta.underline(BASE_URI))

function chalkStatus(status: number) {
  const statusKind = Math.trunc(status / 100)
  if (statusKind === 2) {
    return chalk.black.bgGreen(status)
  } else {
    return chalk.black.bgRed(status)
  }
}

const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 3000

app.get('/*splat', async (req, res) => {
  const bearer = req.headers.authorization
  const uri = `${BASE_URI}${req.originalUrl}`

  const result = await fetch(uri, {
    headers: {
      Authorization: `${bearer}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    method: 'GET',
  })

  log(
    chalk.yellow(`${req.method}`),
    chalk.underline.magenta(`${uri}`, chalkStatus(result.status)),
  )
  const body = await result.json()
 
  res.status(result.status)
  res.json(body)
})

app.post('/*splat', async (req, res) => {
  const body = req.body
  const bearer = req.headers.authorization
  const uri = `${BASE_URI}${req.originalUrl}`

  const result = await fetch(uri, {
    headers: {
      Authorization: `${bearer}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(body),
    method: 'POST',
  })

  log(
    chalk.yellow(`${req.method}`),
    chalk.underline.magenta(`${uri}`, chalkStatus(result.status)),
  )

  res.status(result.status)
  res.json(result)
})

app.listen(port, () => {
  log(`Proxy app listening on port ${chalk.yellow(port)}`)
})
