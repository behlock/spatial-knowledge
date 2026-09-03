import type { NextApiRequest, NextApiResponse } from 'next'

import arabicGraph from '@/data/arabic-nodes.json'
import englishGraph from '@/data/english-nodes.json'
import type { GraphData } from '@/types/graph'
import type { Locale } from '@/modules/language'

const GRAPHS: Record<Locale, GraphData> = {
  en: englishGraph,
  ar: arabicGraph,
}

const isLocale = (value: unknown): value is Locale => typeof value === 'string' && value in GRAPHS

type ErrorBody = { error: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<GraphData | ErrorBody>) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { locale } = req.query
  if (!isLocale(locale)) {
    return res.status(404).json({ error: 'Unknown locale' })
  }

  // The data is static, so let the CDN keep it for a day and serve stale while refreshing.
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800')
  return res.status(200).json(GRAPHS[locale])
}
