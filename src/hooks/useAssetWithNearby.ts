import { useQuery } from '@tanstack/react-query'

export function useAssetWithNearby(assetId: string) {
  const {
    data: asset,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['asset', assetId],
    queryFn: () =>
      fetch(`/api/immich/getAsset/${assetId}`).then((res) => {
        if (!res.ok) {
          throw new Error('Asset not found')
        }
        return res.json()
      }),
  })

  const { data: nearbyPhotos } = useQuery({
    queryKey: ['nearbyPhotos', assetId],
    enabled: !!asset,
    queryFn: () =>
      fetch(`/api/immich/nearbyPhotos/${assetId}`).then((res) => res.json()),
  })

  return { asset, nearbyPhotos, error, isLoading }
}
