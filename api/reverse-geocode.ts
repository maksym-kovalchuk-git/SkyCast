import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { lat, lon } = req.query

  if (!lat || typeof lat !== 'string' || !lon || typeof lon !== 'string') {
    return res.status(400).json({ error: 'Missing "lat"/"lon" query parameters' })
  }

  const apiKey = process.env.OWM_API_KEY
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&limit=1&appid=${apiKey}`

  try {
    const owmRes = await fetch(url)
    const data = await owmRes.json()

    if (!owmRes.ok) {
      return res.status(owmRes.status).json({ error: data.message ?? 'Reverse geocoding API error' })
    }

    res.status(200).json(data)
  } catch {
    res.status(500).json({ error: 'Failed to resolve location' })
  }
}
