import { login, signup } from './actions'

interface Props {
  searchParams: Promise<{ message: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { message } = await searchParams

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-slate-50 font-sans p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-slate-100">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-4">
            🏔️
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Humsafar CRM</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Internal Access Only</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 ml-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
              placeholder="name@humsafar.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 ml-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
              placeholder="••••••••"
            />
          </div>

          {message && (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-700 text-xs font-bold animate-in fade-in slide-in-from-top-2">
              ⚠️ {message}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <button
              formAction={login}
              className="w-full py-4 bg-linear-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl font-black text-sm shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.98]"
            >
              Sign In
            </button>
            <button
              formAction={signup}
              className="w-full py-4 bg-white text-slate-500 border-2 border-slate-100 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              Request Access (Sign Up)
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
