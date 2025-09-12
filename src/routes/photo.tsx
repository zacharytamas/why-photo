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

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex-1">
        <img
          src={`/api/immich/viewAsset/${randomAsset?.id}`}
          alt="Asset"
          className="h-[800px] object-cover"
        />
      </div>
      <div className="flex-2">
        <pre className="overflow-y-scroll">{stringify(asset)}</pre>
      </div>
    </div>
  )
}
