import type { Asset } from '@/models/immich/Asset'
import { PhotoThumbnail } from './PhotoThumbnail'

export function ThumbnailGrid({ photos }: { photos: Asset[] }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {photos?.map((photo: Asset) => (
        <PhotoThumbnail key={photo.id} photo={photo} />
      ))}
    </div>
  )
}
