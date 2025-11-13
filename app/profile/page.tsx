"use client";
import BottomNavigation from "@/components/bottom-navigation";
import PageHeader from "@/components/header";
import ProfileTab from "@/components/profile-tab";
import { useRouter } from "next/navigation";
import { useFamilyContext } from "@/contexts/familyContext";

export default function TasksPage() {
  const router = useRouter();
  const { family } = useFamilyContext()

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col max-w-[430px] mx-auto">
        {family !== null && (
          <PageHeader></PageHeader>
        )}
        
        
        <div className="flex-1 overflow-y-auto">
            <ProfileTab></ProfileTab>
        </div>

        <BottomNavigation></BottomNavigation>
    </div>
  );
}