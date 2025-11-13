"use client";

export default function LoadingScreen() {
  return (
      <div className="p-6 space-y-6 pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-bold ">Cargando...</p>
        </div>
      </div>
  );
}