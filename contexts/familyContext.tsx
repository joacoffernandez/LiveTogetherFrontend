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
  unseenCount: number; 
}

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
  completedTasks: number;
}

interface FamilyContextType {
  family: FamilyData | null;
  families: FamilyData[];
  familyMembers: FamilyMember[];
  isAdmin: boolean;
  familyUser: FamilyMember | null;
  loading: boolean;
  membersLoading: boolean;
  selectFamily: (familyId: string) => void;
  reloadFamilies: () => Promise<void>;
  reloadFamilyMembers: () => Promise<void>;
  reloadFamilyContext: () => Promise<void>;
  incrementFamilyUnseen: (familyId: string) => void;
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
  reloadFamilyContext: async () => {},
  incrementFamilyUnseen: () => {},
});

export const useFamilyContext = () => useContext(FamilyContext);

export default function FamilyProvider({ children }: { children: React.ReactNode }) {
  const [family, setFamily] = useState<FamilyData | null>(null);
  const [families, setFamilies] = useState<FamilyData[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(false);
  const { user } = useUserContext();

  const updateFamiliesSelection = (
    families: FamilyData[],
    selectedFamilyId: string | null
  ): FamilyData[] => {
    return families.map((fam) => ({
      ...fam,
      selected: fam.idFamily === selectedFamilyId,
    }));
  };

  // 🔥 NUEVO FORMATO: unseenNotification
  const loadUnseenCounts = async (): Promise<Record<string, number>> => {
    try {
      const res = await api.get("/notification/getUnseenCount");

      if (res.success && res.data.unseenCount) {
        const map: Record<string, number> = {};

        res.data.unseenCount.forEach(
          (item: { idFamily: string; unseenNotifications: number }) => {
            console.log("Unseen for family", item.idFamily, ":", item.unseenNotifications);
            map[item.idFamily] = item.unseenNotifications ?? 0;
          }
        );

        return map;
      }

      return {};
    } catch (err) {
      console.error("Error cargando unseen notifications:", err);
      return {};
    }
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

  // 🔥 Incremento local de unseen
  const incrementFamilyUnseen = (familyId: string) => {
    setFamilies((prev) =>
      prev.map((f) =>
        f.idFamily === familyId
          ? { ...f, unseenCount: f.unseenCount + 1 }
          : f
      )
    );

    setFamily((prev) =>
      prev && prev.idFamily === familyId
        ? { ...prev, unseenCount: prev.unseenCount + 1 }
        : prev
    );
  };

  const reloadFamilyContext = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const res = await api.get("/family/checkfamilies");
      if (res.success && res.data.families) {
        const unseenMap = await loadUnseenCounts();

        const userFamilies: FamilyData[] = res.data.families.map((f: any) => ({
          ...f,
          unseenCount: unseenMap[f.idFamily] || 0,
        }));

        const storedFamilyId = localStorage.getItem("idFamily");

        const familiesWithSelection = updateFamiliesSelection(
          userFamilies,
          storedFamilyId
        );

        setFamilies(familiesWithSelection);

        if (storedFamilyId) {
          const storedFamily = familiesWithSelection.find(
            (f) => f.idFamily === storedFamilyId
          );

          if (storedFamily) {
            setFamily(storedFamily);
            await loadFamilyMembers(storedFamily.idFamily);
          } else {
            await selectFirstFamily(familiesWithSelection);
          }
        } else {
          await selectFirstFamily(familiesWithSelection);
        }
      } else {
        setFamilies([]);
        setFamily(null);
        setFamilyMembers([]);
      }
    } catch (err) {
      console.error("Error recargando contexto de familia:", err);
      setFamilies([]);
      setFamily(null);
      setFamilyMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const loadFamilies = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await api.get("/family/checkfamilies");

      if (res.success && res.data.families) {
        const unseenMap = await loadUnseenCounts();

        const userFamilies: FamilyData[] = res.data.families.map((f: any) => ({
          ...f,
          unseenCount: unseenMap[f.idFamily] || 0,
        }));

        const storedFamilyId = localStorage.getItem("idFamily");

        const familiesWithSelection = updateFamiliesSelection(
          userFamilies,
          storedFamilyId
        );
        setFamilies(familiesWithSelection);

        if (storedFamilyId) {
          const storedFamily = familiesWithSelection.find(
            (f) => f.idFamily === storedFamilyId
          );

          if (storedFamily) {
            setFamily(storedFamily);
            await loadFamilyMembers(storedFamily.idFamily);
          } else {
            await selectFirstFamily(familiesWithSelection);
          }
        } else {
          await selectFirstFamily(familiesWithSelection);
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

      const updatedFamilies = updateFamiliesSelection(
        userFamilies,
        firstFamily.idFamily
      );
      setFamilies(updatedFamilies);
      setFamily(firstFamily);
      localStorage.setItem("idFamily", firstFamily.idFamily);

      await loadFamilyMembers(firstFamily.idFamily);
    }
  };

  const selectFamily = async (idFamily: string) => {
    const selectedFamily = families.find((f) => f.idFamily === idFamily);

    if (selectedFamily) {
      const updatedFamilies = updateFamiliesSelection(families, idFamily);
      setFamilies(updatedFamilies);
      setFamily(selectedFamily);
      localStorage.setItem("idFamily", idFamily);

      await loadFamilyMembers(idFamily);
    }
  };

  const reloadFamilies = async () => {
    await loadFamilies();
  };

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
  const familyUser =
    familyMembers.find((m) => m.idUser == user?.idUser) || null;

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
        reloadFamilyContext,
        incrementFamilyUnseen,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
}
