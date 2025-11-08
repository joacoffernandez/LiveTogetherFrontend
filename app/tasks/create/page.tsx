"use client";
import BottomNavigation from "@/components/bottom-navigation";
import CreateTaskTab from "@/components/create-task-tab";
import PageHeader from "@/components/header";
import { useRouter } from "next/navigation";

export default function CreateTaskPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col max-w-[430px] mx-auto">
        <PageHeader></PageHeader>
        
        <div className="flex-1 overflow-y-auto">
            <CreateTaskTab onBack={() => router.back()} />
        </div>

        <BottomNavigation></BottomNavigation>
    </div>
  );
}