"use client";
import BottomNavigation from "@/components/bottom-navigation";
import PageHeader from "@/components/header";
import NotesTab from "@/components/notes-tab";

export default function TasksPage() {

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col max-w-[430px] mx-auto">
        <PageHeader></PageHeader>
        
        <div className="flex-1 overflow-y-auto">
            <NotesTab></NotesTab>
        </div>

        <BottomNavigation></BottomNavigation>
    </div>
  );
}