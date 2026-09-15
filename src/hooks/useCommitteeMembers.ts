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
  };
}

export function useCommitteeMembers() {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from("committee_members")
        .select("id, name, designation, phone, area, role, created_at")
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
