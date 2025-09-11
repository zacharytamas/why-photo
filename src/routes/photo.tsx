import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

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
    queryFn: () =>
      fetch(`/api/immich/getAsset/${randomAsset?.id}`).then((res) =>
        res.json(),
      ),
  })

  return (
    <div className="flex flex-row w-full gap-4">
      <div className="flex-1">
        <img
          src={`/api/immich/viewAsset/${randomAsset?.id}`}
          alt="Asset"
          className="w-full"
        />
      </div>
      <div className="flex-1">
        <code className="overflow-y-scroll">
          {JSON.stringify(asset, null, 2)}
        </code>
      </div>
    </div>
  )
}
