import { immichFetch } from '@/lib/immichApi'
import { describe, expect, it, vi } from 'vitest'
import { updateAssetDescription } from '@/routes/api.immich.updateAssetDescription.$id'

vi.mock('@/lib/immichApi', () => ({
  immichFetch: vi.fn(),
}))

describe('updateAssetDescription', () => {
  it('sends the updated description to Immich', async () => {
    const fetchMock = vi.mocked(immichFetch)
    fetchMock.mockResolvedValue({ ok: true } as Response)

    await updateAssetDescription('asset-1', 'Updated description')

    expect(fetchMock).toHaveBeenCalledWith('/assets/asset-1', {
      method: 'PUT',
      body: JSON.stringify({ description: 'Updated description' }),
    })
  })
})
