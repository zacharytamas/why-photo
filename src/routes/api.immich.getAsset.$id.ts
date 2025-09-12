import { immichFetch } from '@/lib/immichApi'
import { AssetSchema } from '@/models/immich/Asset'
import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute(
  '/api/immich/getAsset/$id',
).methods({
  GET: async ({ params }) => {
    const res = await immichFetch(`/assets/${params.id}`)
    const rawJson = await res.json()
    const data = AssetSchema.strict().parse(rawJson)

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
})
