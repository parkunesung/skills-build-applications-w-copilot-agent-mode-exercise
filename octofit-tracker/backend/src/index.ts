import cors from 'cors'
import express from 'express'

const app = express()
const codespaceName = process.env.CODESPACE_NAME
const frontendOrigin = process.env.FRONTEND_URL ?? (codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173')

app.use(cors({ origin: frontendOrigin }))
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

const port = Number(process.env.PORT ?? 8000)
app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`)
})