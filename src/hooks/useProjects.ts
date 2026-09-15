import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { ProjectRow } from "../lib/db";
import type { ClubProject } from "../data/clubData";

function mapRow(row: ProjectRow): ClubProject {
  return {
    id: row.id,
    title: row.title,
    category: row.category as ClubProject["category"],
    categoryEn: row.category_en,
    description: row.description,
    impact: row.impact || "",
    status: row.status as ClubProject["status"],
    imageUrl: row.image_url || "",
    highlights: row.highlights || [],
  };
}

export function useProjects() {
  const [projects, setProjects] = useState<ClubProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select(
          "id, title, category, category_en, description, impact, status, image_url, highlights, created_at",
        )
        .order("created_at", { ascending: true });

      if (!error && data) {
        setProjects((data as ProjectRow[]).map(mapRow));
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return { projects, loading };
}
