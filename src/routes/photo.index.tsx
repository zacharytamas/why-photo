import { PhotoThumbnail } from '@/components/PhotoThumbnail'
import type { Asset } from '@/models/immich/Asset'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/photo/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: randomAsset } = useQuery({
    queryKey: ['randomPhoto'],
    queryFn: () => fetch('/api/immich/randomPhoto').then((res) => res.json()),
  })

  const { data: nearbyPhotos } = useQuery({
    queryKey: ['nearbyPhotos', randomAsset?.id],
    enabled: !!randomAsset?.id,
    queryFn: () =>
      fetch(`/api/immich/nearbyPhotos/${randomAsset?.id}`).then((res) =>
        res.json(),
      ),
  })

  return (
    <div className="flex w-full gap-4">
      <div className="flex-1">
        <img
          src={`/api/immich/viewAsset/${randomAsset?.id}`}
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
