export default function LoginPage() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-12">
        <img src="/memento-logo.svg" alt="Memento Mundi" className="h-16 mx-auto mb-4" />
        <p className="text-center text-cream text-sm font-brasica italic">
          … <span className="text-orange">mundi</span>
        </p>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm">
        <h1 className="font-brasica text-3xl font-bold text-cream mb-2 text-center">Bienvenido</h1>
        <p className="text-center text-cream text-opacity-60 mb-8">Inicia sesión en tu cuenta</p>

        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-cream mb-2">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-lg bg-navy bg-opacity-50 border-2 border-cream border-opacity-20 focus:border-orange focus:outline-none text-cream placeholder-cream placeholder-opacity-40"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-cream mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-navy bg-opacity-50 border-2 border-cream border-opacity-20 focus:border-orange focus:outline-none text-cream placeholder-cream placeholder-opacity-40"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary w-full bg-orange text-white rounded-full py-3.5 px-6 font-bold text-base shadow-lg mt-6"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-cream bg-opacity-20"></div>
          <span className="text-cream text-opacity-50 text-xs">O</span>
          <div className="flex-1 h-px bg-cream bg-opacity-20"></div>
        </div>

        {/* Social Login */}
        <button className="w-full bg-cream bg-opacity-10 border-2 border-cream border-opacity-20 hover:border-orange text-cream rounded-full py-3 px-6 font-bold text-sm transition-all">
          Continuar con Google
        </button>

        {/* Signup Link */}
        <p className="text-center text-cream text-opacity-60 text-sm mt-6">
          ¿No tienes cuenta?{' '}
          <a href="/auth/signup" className="text-orange font-bold hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  )
}
