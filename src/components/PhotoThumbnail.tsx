import type { Asset } from '@/models/immich/Asset'
import { Link } from '@tanstack/react-router'
import { Link as LucideLink } from 'lucide-react'

export function PhotoThumbnail({ photo }: { photo: Asset }) {
  return (
    <div className="relative max-w-32 aspect-square">
      <img
        src={`/api/immich/viewAsset/${photo.id}`}
        alt="Nearby"
        className="h-full w-full object-cover rounded-md shadow-sm"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 flex text-white rounded-b-md">
        <Link to={`/photo/${photo.id}`}>
          <LucideLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
