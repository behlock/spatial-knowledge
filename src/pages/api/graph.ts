import type { NextApiRequest, NextApiResponse } from 'next'

import graph from '@/data/nodes.json'
import type { GraphData } from '@/types/graph'

type ErrorBody = { error: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<GraphData | ErrorBody>) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // The data is static, so let the CDN keep it for a day and serve stale while refreshing.
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800')
  return res.status(200).json(graph)
}
