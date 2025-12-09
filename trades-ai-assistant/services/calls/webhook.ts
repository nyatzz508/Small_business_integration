import { createServer } from 'http'
import { parse } from 'url'
import { SupabaseClient, createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  console.error('Missing SUPABASE env var for service webhook')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

const server = createServer(async (req, res) => {
  const { pathname } = parse(req.url || '')
  if (req.method === 'POST' && pathname === '/webhook/calls') {
    let body = ''
    for await (const chunk of req) body += chunk
    // For Twilio: it posts form-encoded data; parse accordingly if needed.
    // Here we expect JSON for simplicity.
    try {
      const payload = JSON.parse(body || '{}')
      // expected fields: business_id, from, to, started_at, ended_at, transcription
      const { business_id, from, to, started_at, ended_at, transcription } = payload
      const { data, error } = await supabase.from('calls').insert([
        {
          business_id,
          from_number: from,
          to_number: to,
          started_at,
          ended_at,
          transcription,
          metadata: payload
        }
      ]).select().single()

      if (error) throw error

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: true, call: data }))
      return
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: false, error: (err as Error).message }))
      return
    }
  }

  res.writeHead(404)
  res.end()
})

const port = process.env.PORT || 8787
server.listen(port, () => {
  console.log(`Calls webhook listening on http://localhost:${port}`)
})
