"use client"


import HomeTab from "@/components/home-tab"
import BottomNavigation from "@/components/bottom-navigation"
import PageHeader from "@/components/header"

export default function LiveTogetherApp() {

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex flex-col max-w-[430px] mx-auto">

      <PageHeader></PageHeader>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <HomeTab />
      </div>


      <BottomNavigation></BottomNavigation>
    </div>
  )
}
