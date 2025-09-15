import type { Asset } from '@/models/immich/Asset'
import { useQuery } from '@tanstack/react-query'
import { ThumbnailGrid } from '@/components/ThumbnailGrid'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/photo/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  const {
    data: asset,
    error,
    isLoading,
  } = useQuery({
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
    <main className="flex flex-1 gap-4 p-4">
      <div className="flex-1 flex ">
        <img
          src={`/api/immich/viewAsset/${id}`}
          alt="Asset"
          className="object-scale-down w-full aspect-square"
        />
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div className="overflow-y-auto flex-1">
          {<ThumbnailGrid photos={nearbyPhotos} />}
        </div>
        <div className="flex-2">Composer</div>
      </div>
    </main>
  )
}
