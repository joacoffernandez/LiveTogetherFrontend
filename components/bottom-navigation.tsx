"use client";
import { Home, CheckSquare, FileText, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import FamilySwitcher from "./family-switcher";

export default function BottomNavigation() {
  const pathname = usePathname();
  const [showFamilySwitcher, setShowFamilySwitcher] = useState(false);
  const newInvitationsCount = 1;

  const isActive = (path: string) => {
    return (pathname === path) || (pathname.startsWith(path));
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-emerald-100 px-4 py-3 pb-6 z-40">
        <div className="flex items-center justify-around">
          <Link
            href="/home"
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive('/home') ? "text-emerald-600" : "text-gray-700"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Inicio</span>
          </Link>

          <Link
            href="/tasks"
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive('/tasks') ? "text-emerald-600" : "text-gray-700"
            }`}
          >
            <CheckSquare className="w-6 h-6" />
            <span className="text-xs font-medium">Tareas</span>
          </Link>

          <button
            onMouseDown={() => setShowFamilySwitcher(true)}
            onMouseUp={() => setShowFamilySwitcher(false)}
            className="flex flex-col items-center gap-1 text-emerald-600 -mt-2"
          >
            <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
          </button>

          <Link
            href="/notes"
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive('/notes') ? "text-emerald-600" : "text-gray-700"
            }`}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs font-medium">Notas</span>
          </Link>

          <Link
            href="/profile"
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive('/profile') ? "text-emerald-600" : "text-gray-700"
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Perfil</span>
          </Link>
        </div>
      </div>

      <FamilySwitcher
        isOpen={showFamilySwitcher}
        onClose={() => setShowFamilySwitcher(false)}
        newInvitationsCount={newInvitationsCount}
      />
    </>
  );
}