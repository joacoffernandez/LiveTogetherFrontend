"use client";
import BottomNavigation from "@/components/bottom-navigation";
import PageHeader from "@/components/header";
import TasksTab from "@/components/tasks-tab";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col max-w-[430px] mx-auto">
        <PageHeader></PageHeader>
        
        <div className="flex-1 overflow-y-auto">
            <TasksTab
            onNavigateToCalendar={() => router.push('tasks/calendar')}
            onNavigateToCreateTask={() => router.push('tasks/create')}
            />
        </div>

        <BottomNavigation></BottomNavigation>
    </div>
  );
}