import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute(
  '/api/immich/viewAsset/$id',
).methods({
  GET: async ({ params }) => {
    const res = await fetch(
      `${import.meta.env.VITE_IMMICH_HOST}/api/assets/${params.id}/thumbnail?size=preview`,
      {
        method: 'GET',
        headers: {
          'x-api-key': import.meta.env.VITE_IMMICH_API_KEY || '',
          'Content-Type': 'application/json',
          Accept: 'application/octet-stream',
        },
      },
    )

    return new Response(await res.blob(), {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    })
  },
})
