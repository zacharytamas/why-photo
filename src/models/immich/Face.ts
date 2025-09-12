import { z } from 'zod'

export const FaceSchema = z
  .object({
    id: z.string(),
    imageHeight: z.number(),
    imageWidth: z.number(),
    boundingBoxX1: z.number(),
    boundingBoxY1: z.number(),
    boundingBoxX2: z.number(),
    boundingBoxY2: z.number(),
    sourceType: z.enum(['machine-learning', 'manual', 'exif']),
  })
  .strict()
