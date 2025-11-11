"use client";
import { Users, Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFamilyContext } from "@/contexts/familyContext";

export default function PageHeader() {
  const { family } = useFamilyContext()
  const newNotificationsCount = 1; // Esto podría venir de un contexto

  return (
    <div className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-emerald-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold">{family?.name}</h1>
        </div>
      </div>
      <Link
        href="/notifications"
        className="flex flex-col items-center gap-1 transition-colors relative text-gray-400 hover:text-emerald-600"
      >
        <Bell className="w-6 h-6" />
        {newNotificationsCount > 0 && (
          <div className="absolute -top-2 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{newNotificationsCount}</span>
          </div>
        )}
      </Link>
    </div>
  );
}