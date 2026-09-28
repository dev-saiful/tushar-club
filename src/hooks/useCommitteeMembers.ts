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
      const { data, error } = await supabase
        .from("committee_members")
        // select("*") so the section keeps rendering even before the photo_url migration is applied
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMembers((data as CommitteeMemberRow[]).map(mapRow));
      }
      setLoading(false);
    };

    fetchMembers();
  }, []);

  return { members, loading };
}
