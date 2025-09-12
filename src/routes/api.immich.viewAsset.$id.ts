import { immichFetch } from '@/lib/immichApi'
import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute(
  '/api/immich/viewAsset/$id',
).methods({
  GET: async ({ params }) => {
    const res = await immichFetch(
      `/assets/${params.id}/thumbnail?size=preview`,
      { headers: { Accept: 'application/octet-stream' } },
    )

    return new Response(await res.blob(), {
      headers: { 'Content-Type': 'application/octet-stream' },
    })
  },
})
