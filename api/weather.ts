import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { city } = req.query

  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'Missing "city" query parameter' })
  }

  const apiKey = process.env.OWM_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ua`

  try {
    const owmRes = await fetch(url)
    const data = await owmRes.json()

    if (!owmRes.ok) {
      return res.status(owmRes.status).json({ error: data.message ?? 'Weather API error' })
    }

    res.status(200).json(data)
  } catch {
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
}
