import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { GalleryItemRow } from '../lib/db'
import type { GalleryItem } from '../data/clubData'

function mapRow(row: GalleryItemRow): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    date: row.date,
    imageUrl: row.image_url,
  }
}

export function useGalleryItems() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('date', { ascending: false })

      if (!error && data) {
        setItems((data as GalleryItemRow[]).map(mapRow))
      }
      setLoading(false)
    }

    fetchItems()
  }, [])

  return { items, loading }
}
