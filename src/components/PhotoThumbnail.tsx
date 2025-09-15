import type { Asset } from '@/models/immich/Asset'
import { Link } from '@tanstack/react-router'

export function PhotoThumbnail({ photo }: { photo: Asset }) {
  return (
    <div className="relative">
      <Link to={`/photo/${photo.id}`}>
        <img
          src={`/api/immich/viewAsset/${photo.id}`}
          alt="Nearby"
          className="h-32 w-full object-cover"
        />
      </Link>
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 flex">
        {photo.originalFileName}
      </div>
    </div>
  )
}
