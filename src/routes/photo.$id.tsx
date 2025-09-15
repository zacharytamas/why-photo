import { PhotoThumbnail } from '@/components/PhotoThumbnail'
import type { Asset } from '@/models/immich/Asset'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/photo/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  const { data: asset, error } = useQuery({
    queryKey: ['asset', id],
    queryFn: () =>
      fetch(`/api/immich/getAsset/${id}`).then((res) => {
        if (!res.ok) {
          throw new Error('Asset not found')
        }
        return res.json()
      }),
  })

  const { data: nearbyPhotos } = useQuery({
    queryKey: ['nearbyPhotos', id],
    enabled: !!asset,
    queryFn: () =>
      fetch(`/api/immich/nearbyPhotos/${id}`).then((res) => res.json()),
  })

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
    <div className="flex w-full gap-4">
      <div className="flex-1">
        <img
          src={`/api/immich/viewAsset/${id}`}
          alt="Asset"
          className="h-[800px] object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-3 gap-2">
          {nearbyPhotos?.map((photo: Asset) => (
            <PhotoThumbnail key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    </div>
  )
}
