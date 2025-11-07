"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useUserContext } from "./userContext";

interface FamilyData {
  idFamily: string;
  name: string;
  role: string;
  selected: boolean; // ← NUEVO CAMPO
}

interface FamilyContextType {
  family: FamilyData | null;
  families: FamilyData[];
  isAdmin: boolean;
  loading: boolean;
  selectFamily: (familyId: string) => void;
  reloadFamilies: () => Promise<void>;
}

const FamilyContext = createContext<FamilyContextType>({
  family: null,
  families: [],
  isAdmin: false,
  loading: true,
  selectFamily: () => {},
  reloadFamilies: async () => {},
});

export const FamilyProvider = ({ children }: { children: React.ReactNode }) => {
  const [family, setFamily] = useState<FamilyData | null>(null);
  const [families, setFamilies] = useState<FamilyData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();


  const updateFamiliesSelection = (families: FamilyData[], selectedFamilyId: string | null): FamilyData[] => {
    return families.map(fam => ({
      ...fam,
      selected: fam.idFamily === selectedFamilyId
    }));
  };


  const loadFamilies = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      const res = await api.get('/family/checkfamilies');
      console.log(res.data)
      
      if (res.success && res.data.families) {
        const userFamilies: FamilyData[] = res.data.families;
        const storedFamilyId = localStorage.getItem("idFamily");
        

        const familiesWithSelection = updateFamiliesSelection(userFamilies, storedFamilyId);
        setFamilies(familiesWithSelection);
        
        if (storedFamilyId) {
          const storedFamily = familiesWithSelection.find(f => f.idFamily === storedFamilyId);
          
          if (storedFamily) {
            setFamily(storedFamily);
            console.log("✅ Familia verificada y cargada:", storedFamily);
          } else {
            console.warn("Familia guardada no válida, seleccionando primera disponible");
            selectFirstFamily(familiesWithSelection);
          }
        } else {
          selectFirstFamily(familiesWithSelection);
        }
      } else {
        setFamilies([]);
        setFamily(null);
      }
    } catch (err) {
      console.error("Error cargando familias:", err);
      setFamilies([]);
      setFamily(null);
    } finally {
      setLoading(false);
    }
  };

  const selectFirstFamily = (userFamilies: FamilyData[]) => {
    if (userFamilies.length > 0) {
      const firstFamily = userFamilies[0];

      const updatedFamilies = updateFamiliesSelection(userFamilies, firstFamily.idFamily);
      setFamilies(updatedFamilies);
      setFamily(firstFamily);
      localStorage.setItem("idFamily", firstFamily.idFamily);
    }
  };

  const selectFamily = (idFamily: string) => {
    const selectedFamily = families.find(f => f.idFamily === idFamily);
    
    if (selectedFamily) {

      const updatedFamilies = updateFamiliesSelection(families, idFamily);
      setFamilies(updatedFamilies);
      setFamily(selectedFamily);
      localStorage.setItem("idFamily", idFamily);
      console.log("🏠 Familia seleccionada:", selectedFamily.name);
    }
  };

  // refresh 
  const reloadFamilies = async () => {
    await loadFamilies();
  };

  // cargar cuando inicie una pagina 
  useEffect(() => {
    if (user) {
      loadFamilies();
    } else {
      setFamily(null);
      setFamilies([]);
      setLoading(false);
    }
  }, [user]);

  const isAdmin = family?.role === "admin";

  return (
    <FamilyContext.Provider
      value={{
        family,
        families,
        isAdmin,
        loading,
        selectFamily,
        reloadFamilies,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamilyContext = () => useContext(FamilyContext);