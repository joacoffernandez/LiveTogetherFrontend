"use client"

import { useState } from "react"
import { Home, CheckSquare, FileText, User, Users, Bell } from "lucide-react"
import HomeTab from "@/components/home-tab"
import TasksTab from "@/components/tasks-tab"
import NotesTab from "@/components/notes-tab"
import ProfileTab from "@/components/profile-tab"
import CalendarTab from "@/components/calendar-tab"
import CreateTaskTab from "@/components/create-task-tab"
import FamilySwitcher from "@/components/family-switcher"
import NotificationsTab from "@/components/notifications-tab"
import InvitationsTab from "@/components/invitations-tab"
import BottomNavigation from "@/components/bottom-navigation"
import PageHeader from "@/components/header"

export default function LiveTogetherApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [showFamilySwitcher, setShowFamilySwitcher] = useState(false)
  const [currentFamily, setCurrentFamily] = useState("")

  const newTasksCount = 3
  const newNotesCount = 2
  const newNotificationsCount = 5
  const newInvitationsCount = 1

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />
      case "tasks":
        return (
          <TasksTab
            onNavigateToCalendar={() => setActiveTab("calendar")}
            onNavigateToCreateTask={() => setActiveTab("create-task")}
          />
        )
      case "notes":
        return <NotesTab />
      case "profile":
        return <ProfileTab />
      case "calendar":
        return <CalendarTab />
      case "create-task":
        return <CreateTaskTab onBack={() => setActiveTab("tasks")} />
      case "notifications":
        return <NotificationsTab />
      case "invitations":
        return <InvitationsTab />
      default:
        return <HomeTab />
    }
  }


  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col max-w-[430px] mx-auto">

      <PageHeader></PageHeader>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>


      <BottomNavigation></BottomNavigation>
    </div>
  )
}
