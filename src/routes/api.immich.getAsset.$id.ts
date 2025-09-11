import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute(
  '/api/immich/getAsset/$id',
).methods({
  GET: async ({ params }) => {
    const res = await fetch(
      `${import.meta.env.VITE_IMMICH_HOST}/api/assets/${params.id}`,
      {
        method: 'GET',
        headers: {
          'x-api-key': import.meta.env.VITE_IMMICH_API_KEY || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )

    return new Response(JSON.stringify(await res.json()), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
})
