import { z } from 'zod'

export const FaceSchema = z
  .object({
    assetId: z.string().optional(),
    id: z.string(),
    personId: z.string().nullable().optional(),
    imageHeight: z.number(),
    imageWidth: z.number(),
    boundingBoxX1: z.number(),
    boundingBoxY1: z.number(),
    boundingBoxX2: z.number(),
    boundingBoxY2: z.number(),
    sourceType: z.enum(['machine-learning', 'manual', 'exif']),
    deletedAt: z.coerce.date().nullable().optional(),
    updatedAt: z.coerce.date().nullable().optional(),
    updateId: z.string().nullable().optional(),
    isVisible: z.boolean().nullable().optional(),
    person: z.object({}).nullable().optional(),
  })
  .strict()
