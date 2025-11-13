"use client";
import BottomNavigation from "@/components/bottom-navigation";
import PageHeader from "@/components/header";
import TasksTab from "@/components/tasks-tab";
import { useRouter } from "next/navigation";
import { useFamilyTasks } from "@/hooks/useFamilyTasks";
import LoadingScreen from "@/components/loading";

export default function TasksPage() {
  const router = useRouter();
  const { tasks, loading, error, reloadTasks } = useFamilyTasks()

  if (loading) return (
        <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col max-w-[430px] mx-auto">
        <PageHeader></PageHeader>
        
        <div className="flex-1 overflow-y-auto">
            <LoadingScreen></LoadingScreen>
        </div>

        <BottomNavigation></BottomNavigation>
    </div>
  )
 
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col max-w-[430px] mx-auto">
        <PageHeader></PageHeader>
        
        <div className="flex-1 overflow-y-auto">
            <TasksTab
            tasks={tasks}
            reloadTasks={reloadTasks}
            onNavigateToCalendar={() => router.push('tasks/calendar')}
            onNavigateToCreateTask={() => router.push('tasks/create')}
            isWidget={false}
            />
        </div>

        <BottomNavigation></BottomNavigation>
    </div>
  );
  }
