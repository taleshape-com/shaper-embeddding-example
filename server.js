import http from 'http'
import fs from 'fs'

const BASE_URL = 'http://localhost:5454'
const PORT = 3001
const DASHBOARD_ID = process.env.DASHBOARD_ID ?? 'hktf9zy22rurvut8txg931m9';
const API_KEY = process.env.API_KEY ?? 'shaperkey.dezrwe4wk1ib1ps1l800d21h.JXPttYgCVakWLZkVdIaT5p7wk0B2lBfZ';
const VARIABLES = JSON.parse(process.env.VARIABLES ?? '{"user_id": "user_1"}');

const server = http.createServer(async (req, res) => {
  // Get JWT from Shaper API
  if (req.url === '/api/jwt' && req.method === 'POST') {
    // In production you would need to authenticate the users first
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', async () => {
      try {
        // Here we send a request to the Shaper API to get a JWT token
        const r = await fetch(`${BASE_URL}/api/auth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: API_KEY,
            dashboardId: DASHBOARD_ID,
            variables: VARIABLES,
          }),
        })
        if (r.status !== 200) {
          console.error('failed fetching token:', await r.text())
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Fail to get JWT' }))
          return
        }
        const { jwt } = await r.json()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(jwt))
      } catch (error) {
        console.error(error)
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Invalid JSON or missing baseUrl' }))
      }
    })
    return
  }

  // Serve index.html
  fs.readFile('index.html', (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404)
        res.end('File not found')
        return
      }
      res.writeHead(500)
      res.end('Sorry, there was an error loading the page')
      return
    }
    res.writeHead(200, { 'Content-Type': 'text/html' })
    content = content.toString().replace('$BASE_URL', BASE_URL)
    content = content.toString().replace('$DASHBOARD_ID', DASHBOARD_ID)
    content = content.toString().replace('$VARIABLES', JSON.stringify(VARIABLES))
    res.end(content)
  })
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})

