import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useState,
} from 'react'

interface DescriptionComposerProps {
  assetId?: string
  initialDescription?: string | null
}

export function DescriptionComposer({
  assetId,
  initialDescription,
}: DescriptionComposerProps) {
  const [value, setValue] = useState(initialDescription ?? '')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setValue(initialDescription ?? '')
  }, [initialDescription])

  const submitDescription = async () => {
    if (!assetId) {
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/immich/updateAssetDescription/${assetId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description: value }),
        },
      )

      if (!response.ok) {
        setError('Could not update description.')
      } else {
        await response.json()
      }
    } catch {
      setError('Could not update description.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.metaKey) {
      event.preventDefault()
      void submitDescription()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-medium text-foreground">Description</div>
      <Textarea
        value={value}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setValue(event.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="What is happening in this photo?"
        className="min-h-32 resize-none"
      />
      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={() => void submitDescription()}
          disabled={!assetId || isSaving}
        >
          {isSaving ? 'Saving...' : 'Submit'}
        </Button>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </div>
    </div>
  )
}
