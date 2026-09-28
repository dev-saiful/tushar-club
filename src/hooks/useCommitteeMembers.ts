import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { CommitteeMemberRow } from "../lib/db";
import type { CommitteeMember } from "../data/clubData";

function mapRow(row: CommitteeMemberRow): CommitteeMember {
  return {
    name: row.name,
    designation: row.designation,
    phone: row.phone || undefined,
    area: row.area,
    role: row.role,
    photoUrl: row.photo_url || undefined,
  };
}

export function useCommitteeMembers() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      // select("*") so the section keeps rendering even before the photo_url migration is applied.
      // Order in the database on the indexed display_order column.
      const ordered = await supabase
        .from("committee_members")
        .select("*")
        .order("display_order", { ascending: true });

      let data = ordered.data;

      // Fall back to the old ordering if docs/supabase-committee-order.sql has
      // not been applied yet, so the section never goes blank.
      if (ordered.error) {
        const fallback = await supabase
          .from("committee_members")
          .select("*")
          .order("created_at", { ascending: true });
        data = fallback.data;
      }

      if (data) {
        setMembers((data as CommitteeMemberRow[]).map(mapRow));
      }
      setLoading(false);
    };

    fetchMembers();
  }, []);

  return { members, loading };
}
