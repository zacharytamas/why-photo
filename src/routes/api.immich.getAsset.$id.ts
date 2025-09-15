import { immichFetch } from '@/lib/immichApi'
import { AssetSchema } from '@/models/immich/Asset'
import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute(
  '/api/immich/getAsset/$id',
).methods({
  GET: async ({ params }) => {
    const res = await immichFetch(`/assets/${params.id}`)

    if (!res.ok) {
      if (res.status === 404) {
        return new Response(JSON.stringify({ error: 'Asset not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      return new Response(JSON.stringify({ error: 'Could not get asset' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const rawJson = await res.json()
    const data = AssetSchema.strict().parse(rawJson)

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
})
