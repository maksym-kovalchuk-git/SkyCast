import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { q } = req.query

  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Missing "q" query parameter' })
  }

  const apiKey = process.env.OWM_API_KEY
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${apiKey}`

  try {
    const owmRes = await fetch(url)
    const data = await owmRes.json()

    if (!owmRes.ok) {
      return res.status(owmRes.status).json({ error: data.message ?? 'Geocoding API error' })
    }

    res.status(200).json(data)
  } catch {
    res.status(500).json({ error: 'Failed to fetch city suggestions' })
  }
}
