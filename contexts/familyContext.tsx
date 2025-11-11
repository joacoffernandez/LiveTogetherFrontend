"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useUserContext } from "./userContext";

interface FamilyData {
  idFamily: string;
  name: string;
  role: string;
  members: number; 
  selected: boolean;
}

// Tipo para los miembros de la familia
interface FamilyMember {
  idFamilyUser: string;
  idUser: string;
  idRole: number;
  points: number;
  user: {
    firstName: string;
    lastName: string;
    username: string;
  };
}

interface FamilyContextType {
  family: FamilyData | null;
  families: FamilyData[];
  familyMembers: FamilyMember[]; // ← NUEVO: miembros de la familia
  isAdmin: boolean;
  familyUser: FamilyMember | null;
  loading: boolean;
  membersLoading: boolean; // ← NUEVO: loading específico para miembros
  selectFamily: (familyId: string) => void;
  reloadFamilies: () => Promise<void>;
  reloadFamilyMembers: () => Promise<void>; // ← NUEVO: función para recargar miembros
}

const FamilyContext = createContext<FamilyContextType>({
  family: null,
  families: [],
  familyMembers: [],
  isAdmin: false,
  familyUser: null, 
  loading: true,
  membersLoading: false,
  selectFamily: () => {},
  reloadFamilies: async () => {},
  reloadFamilyMembers: async () => {},
});


export const useFamilyContext = () => useContext(FamilyContext);

export default function FamilyProvider({ children }: { children: React.ReactNode }) {
  const [family, setFamily] = useState<FamilyData | null>(null);
  const [families, setFamilies] = useState<FamilyData[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(false);
  const { user } = useUserContext();

  const updateFamiliesSelection = (families: FamilyData[], selectedFamilyId: string | null): FamilyData[] => {
    return families.map(fam => ({
      ...fam,
      selected: fam.idFamily === selectedFamilyId
    }));
  };

  const loadFamilyMembers = async (familyId: string) => {
    if (!familyId) return;
    
    try {
      setMembersLoading(true);
      const res = await api.get(`/family/rankings/${familyId}`);
      
      if (res.success && res.data) {
        setFamilyMembers(res.data.rankings);
      } else {
        setFamilyMembers([]);
      }
    } catch (err) {
      console.error("Error cargando miembros de la familia:", err);
      setFamilyMembers([]);
    } finally {
      setMembersLoading(false);
    }
  };

  const reloadFamilyMembers = async () => {
    if (family) {
      await loadFamilyMembers(family.idFamily);
    }
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

            await loadFamilyMembers(storedFamily.idFamily);
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
        setFamilyMembers([]);
      }
    } catch (err) {
      console.error("Error cargando familias:", err);
      setFamilies([]);
      setFamily(null);
      setFamilyMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const selectFirstFamily = async (userFamilies: FamilyData[]) => {
    if (userFamilies.length > 0) {
      const firstFamily = userFamilies[0];

      const updatedFamilies = updateFamiliesSelection(userFamilies, firstFamily.idFamily);
      setFamilies(updatedFamilies);
      setFamily(firstFamily);
      localStorage.setItem("idFamily", firstFamily.idFamily);
      
      await loadFamilyMembers(firstFamily.idFamily);
    }
  };

  const selectFamily = async (idFamily: string) => {
    const selectedFamily = families.find(f => f.idFamily === idFamily);
    
    if (selectedFamily) {
      const updatedFamilies = updateFamiliesSelection(families, idFamily);
      setFamilies(updatedFamilies);
      setFamily(selectedFamily);
      localStorage.setItem("idFamily", idFamily);

      await loadFamilyMembers(idFamily);

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
      setFamilyMembers([]);
      setLoading(false);
    }
  }, [user]);

  const isAdmin = family?.role === "Admin";

  const familyUser = familyMembers.find((member) => member.idUser == user?.idUser) || null;

  return (
    <FamilyContext.Provider
      value={{
        family,
        families,
        familyMembers, 
        isAdmin,
        familyUser,
        loading,
        membersLoading, 
        selectFamily,
        reloadFamilies,
        reloadFamilyMembers,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};