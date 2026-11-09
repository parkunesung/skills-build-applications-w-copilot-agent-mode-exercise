import { useEffect, useState } from 'react'

function getItems(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  const candidates = [
    payload?.results,
    payload?.data,
    payload?.items,
    payload?.data?.results,
  ]
  const items = candidates.find(Array.isArray)

  if (!items) {
    throw new Error('The API response did not contain a list of items.')
  }

  return items
}

export function useCollection(endpoint) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed (${response.status} ${response.statusText}).`)
        }

        const payload = await response.json()
        setItems(getItems(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadItems()

    return () => controller.abort()
  }, [endpoint])

  return { items, loading, error }
}
