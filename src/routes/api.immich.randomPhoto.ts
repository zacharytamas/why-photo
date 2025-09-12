import { immichFetch } from '@/lib/immichApi'
import { createServerFileRoute } from '@tanstack/react-start/server'

interface Asset {
  id: string
  type: 'IMAGE' | 'VIDEO'
  isFavorite: boolean
}

export const ServerRoute = createServerFileRoute(
  '/api/immich/randomPhoto',
).methods({
  GET: async () => {
    const res = await immichFetch('/search/random', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const assets = (await res.json()) as Asset[]

    return new Response(JSON.stringify(assets.at(0)), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
})
