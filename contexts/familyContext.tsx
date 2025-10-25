"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api"; // tu helper de fetch o axios

interface FamilyData {
  familyId: number;
  name: string;
  role: string;
}

interface FamilyContextType {
  family: FamilyData | null;
  isAdmin: boolean;
  loading: boolean;
  reloadFamily: () => Promise<void>;
}

const FamilyContext = createContext<FamilyContextType>({
  family: null,
  isAdmin: false,
  loading: true,
  reloadFamily: async () => {},
});

export const FamilyProvider = ({ children }: { children: React.ReactNode }) => {
  const [family, setFamily] = useState<FamilyData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFamily = async () => {
    try {
      setLoading(true);
      const res = await api.get("/family/checkfamilies");
      if (res.success) {
        setFamily(res.data); // ejemplo: { id: 12, name: "Fernandez", role: "admin" }
      }
    } catch (err) {
      console.error("Error cargando familia:", err);
      setFamily(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamily();
  }, []);

  const isAdmin = family?.role === "admin";

  return (
    <FamilyContext.Provider
      value={{
        family,
        isAdmin,
        loading,
        reloadFamily: fetchFamily,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamilyContext = () => useContext(FamilyContext);
