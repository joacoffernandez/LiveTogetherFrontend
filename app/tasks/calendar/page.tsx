"use client"

import BottomNavigation from "@/components/bottom-navigation";
import CalendarTab from "@/components/calendar-tab";
import PageHeader from "@/components/header";
import LoadingScreen from "@/components/loading";
import { useFamilyTasks } from "@/hooks/useFamilyTasks";

export default function CalendarPage() {
  const { tasks, reloadTasks, loading } = useFamilyTasks()

  if (loading) return <LoadingScreen></LoadingScreen>

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col max-w-[430px] mx-auto">
        <PageHeader></PageHeader>

        <div className="flex-1 overflow-y-auto">
            <CalendarTab
            tasks={tasks}
            reloadTasks={reloadTasks}
             />
        </div>

        <BottomNavigation></BottomNavigation>
    </div>
  );
}