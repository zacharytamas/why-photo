import type { Asset } from '@/models/immich/Asset'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { stringify } from 'yaml'

export const Route = createFileRoute('/photo')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: randomAsset } = useQuery({
    queryKey: ['randomPhoto'],
    queryFn: () => fetch('/api/immich/randomPhoto').then((res) => res.json()),
  })

  const { data: asset } = useQuery({
    queryKey: ['asset', randomAsset?.id],
    enabled: !!randomAsset?.id,
    queryFn: () =>
      fetch(`/api/immich/getAsset/${randomAsset?.id}`).then((res) =>
        res.json(),
      ),
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
            <img
              key={photo.id}
              src={`/api/immich/viewAsset/${photo.id}`}
              alt="Nearby"
              className="h-32 w-full object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
