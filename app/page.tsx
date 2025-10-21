import Link from "next/link"
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-6">
      {/* Logo/Brand */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl mb-6 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
        <h1 className="text-5xl font-bold text-green-900 mb-3">LiveTogether</h1>
        <p className="text-lg text-green-700">Organiza tu familia, simplifica tu vida</p>
      </div>

      {/* Illustration/Image placeholder */}
      <div className="mb-12 w-full max-w-md">
        <div className="aspect-square bg-white/50 rounded-3xl shadow-lg flex items-center justify-center backdrop-blur-sm border border-green-200/50">
          <svg className="w-48 h-48 text-green-600/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.86-.93-7-5.43-7-10V8.3l7-3.11 7 3.11V10c0 4.57-3.14 9.07-7 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
      </div>

      {/* Auth Section */}
      <div className="w-full max-w-md space-y-6">
        <p className="text-center text-green-800 text-lg font-medium">¿Tienes una cuenta?</p>

        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 active:scale-[0.98] text-center"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/signup"
            className="block w-full bg-white text-green-700 py-4 rounded-2xl font-semibold text-lg shadow-md hover:shadow-lg border-2 border-green-200 hover:border-green-300 transition-all duration-200 active:scale-[0.98] text-center"
          >
            Crear cuenta
          </Link>
        </div>

        <p className="text-center text-sm text-green-600 mt-8">Al continuar, aceptas nuestros términos y condiciones</p>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-green-400/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl"></div>
    </div>
  )
}
