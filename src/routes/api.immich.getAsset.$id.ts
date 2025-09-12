import { immichFetch } from '@/lib/immichApi'
import { createServerFileRoute } from '@tanstack/react-start/server'
import { z } from 'zod'

const ResponseSchema = z.object({})

export const ServerRoute = createServerFileRoute(
  '/api/immich/getAsset/$id',
).methods({
  GET: async ({ params }) => {
    const res = await immichFetch(`/assets/${params.id}`)
    const { originalPath, deviceId, ...data } = await res.json()

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
})
