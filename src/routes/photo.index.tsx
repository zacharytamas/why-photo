import { DescriptionComposer } from '@/components/DescriptionComposer'
import { ThumbnailGrid } from '@/components/ThumbnailGrid'
import { useAssetWithNearby } from '@/hooks/useAssetWithNearby'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/photo/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: randomAsset } = useQuery({
    queryKey: ['randomPhoto'],
    queryFn: () => fetch('/api/immich/randomPhoto').then((res) => res.json()),
  })
  const { asset, nearbyPhotos, error, isLoading } = useAssetWithNearby(
    randomAsset?.id,
  )

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-[800px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Asset Not Found
          </h2>
          <p className="text-gray-600">
            The requested photo could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="flex flex-1 gap-4 p-4">
      <div className="flex-1 flex">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="w-32 animate-spin" />
          </div>
        ) : (
          <img
            src={`/api/immich/viewAsset/${randomAsset.id}`}
            alt="Asset"
            className="object-scale-down w-full aspect-square"
          />
        )}
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div className="overflow-y-auto flex-1">
          {<ThumbnailGrid photos={nearbyPhotos} />}
        </div>
        <div className="flex-2">
          <DescriptionComposer
            assetId={asset?.id}
            initialDescription={asset?.exifInfo?.description}
          />
        </div>
      </div>
    </main>
  )
}
