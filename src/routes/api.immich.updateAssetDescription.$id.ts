import { immichFetch } from '@/lib/immichApi'
import { createServerFileRoute } from '@tanstack/react-start/server'

interface UpdateAssetDescriptionPayload {
  description?: string
}

export const updateAssetDescription = (assetId: string, description: string) =>
  immichFetch(`/assets/${assetId}`, {
    method: 'PUT',
    body: JSON.stringify({ description }),
  })

export const ServerRoute = createServerFileRoute(
  '/api/immich/updateAssetDescription/$id',
).methods({
  PUT: async ({ params, request }) => {
    const payload = (await request.json()) as UpdateAssetDescriptionPayload
    const description = payload?.description ?? ''

    const response = await updateAssetDescription(params.id, description)

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Could not update description' }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
})
