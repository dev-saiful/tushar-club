import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { BloodDonorRow } from "../lib/db";
import type { BloodDonor } from "../data/clubData";

function mapRow(row: BloodDonorRow): BloodDonor {
  return {
    id: row.id,
    name: row.name,
    bloodGroup: row.blood_group as BloodDonor["bloodGroup"],
    phone: row.phone,
    area: row.area,
    lastDonation: row.last_donation || "",
    available: row.available,
  };
}

export function useBloodDonors() {
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      const { data, error } = await supabase
        .from("blood_donors")
        .select(
          "id, name, blood_group, phone, area, last_donation, available, created_at",
        )
        .order("created_at", { ascending: true });

      if (!error && data) {
        setDonors((data as BloodDonorRow[]).map(mapRow));
      }
      setLoading(false);
    };

    fetchDonors();
  }, []);

  return { donors, loading };
}
