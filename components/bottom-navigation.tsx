"use client";
import { Home, CheckSquare, FileText, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col max-w-[430px] mx-auto">
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
  );
}