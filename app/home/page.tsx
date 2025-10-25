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

      {/* Header */}
      <div className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{currentFamily}</h1>
          </div>
        </div>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex flex-col items-center gap-1 transition-colors relative ${
            activeTab === "notifications" ? "text-emerald-600" : "text-gray-400"
          }`}
        >
          <Bell className="w-6 h-6" />
          {newNotificationsCount > 0 && (
            <div className="absolute -top-2 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{newNotificationsCount}</span>
            </div>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-emerald-100 px-4 py-3 pb-6 z-40">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "home" ? "text-emerald-600" : "text-gray-700"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Inicio</span>
          </button>

          <button
            onClick={() => setActiveTab("tasks")}
            className={`flex flex-col items-center gap-1 transition-colors relative ${
              activeTab === "tasks" ? "text-emerald-600" : "text-gray-700"
            }`}
          >
            <CheckSquare className="w-6 h-6" />
            <span className="text-xs font-medium">Tareas</span>
          </button>

          <button
            onMouseDown={() => setShowFamilySwitcher(true)}
            onMouseUp={() => setShowFamilySwitcher(false)}

            className="flex flex-col items-center gap-1 text-emerald-600 -mt-2"
          >
            <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`flex flex-col items-center gap-1 transition-colors relative ${
              activeTab === "notes" ? "text-emerald-600" : "text-gray-700"
            }`}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs font-medium">Notas</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "profile" ? "text-emerald-600" : "text-gray-700"
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </div>


      <FamilySwitcher
        isOpen={showFamilySwitcher}
        onClose={() => setShowFamilySwitcher(false)}
        currentFamily={currentFamily}
        onSelectFamily={setCurrentFamily}
        onNavigateToInvitations={() => setActiveTab("invitations")}
        newInvitationsCount={newInvitationsCount}
      />
    </div>
  )
}
