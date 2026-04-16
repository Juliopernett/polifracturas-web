require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const contactRoute = require('./routes/contact')
const pqrsRoute = require('./routes/pqrs')
const jobsRoute = require('./routes/jobs')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/contact', contactRoute)
app.use('/api/pqrs', pqrsRoute)
app.use('/api/jobs', jobsRoute)

app.get('/api/health', (req, res) => res.json({ ok: true }))

// En producción, Express sirve el build de React
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../client/dist')
  app.use(express.static(distPath))
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
