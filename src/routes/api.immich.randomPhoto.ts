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
    const res = await fetch(
      `${import.meta.env.VITE_IMMICH_HOST}/api/search/random`,
      {
        method: 'POST',
        headers: {
          'x-api-key': import.meta.env.VITE_IMMICH_API_KEY || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          // type: 'IMAGE',
        }),
      },
    )

    const assets = (await res.json()) as Asset[]

    return new Response(JSON.stringify(assets.at(0)), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
})
