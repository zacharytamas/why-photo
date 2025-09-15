import { immichFetch } from '@/lib/immichApi'
import { type Asset, AssetSchema } from '@/models/immich/Asset'
import { createServerFileRoute } from '@tanstack/react-start/server'
import ms from 'ms'

export const ServerRoute = createServerFileRoute(
  '/api/immich/nearbyPhotos/$id',
).methods({
  GET: async ({ params }) => {
    // NOTE(zachary): It would be more efficient if we just passed in the timestamp and the main
    // asset id instead of doing another API request to get that data. In places where this is
    // used in the UI we already have that information.

    // First, get the main asset to find its taken date
    const assetRes = await immichFetch(`/assets/${params.id}`)
    const assetData = await assetRes.json()
    const asset = AssetSchema.strict().parse(assetData)

    // Use localDateTime or exifInfo.dateTimeOriginal
    const takenDate = asset.localDateTime || asset.exifInfo?.dateTimeOriginal
    if (!takenDate) {
      return new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const takenDateObj = new Date(takenDate)
    const takenAfter = new Date(
      takenDateObj.getTime() - ms('6 hours'),
    ).toISOString()
    const takenBefore = new Date(
      takenDateObj.getTime() + ms('6 hours'),
    ).toISOString()

    // Search for nearby assets
    const searchRes = await immichFetch('/search/metadata', {
      method: 'POST',
      body: JSON.stringify({
        takenAfter,
        takenBefore,
        size: 100,
        // type: 'IMAGE', // Only images
      }),
    })

    const searchData = await searchRes.json()
    const nearbyAssets = searchData.assets || []

    // Filter out the main asset
    const filteredAssets = nearbyAssets.items.filter(
      (a: Asset) => a.id !== params.id,
    )

    return new Response(JSON.stringify(filteredAssets), {
      headers: { 'Content-Type': 'application/json' },
    })
  },
})
