import { login } from './actions'
import { SubmitButton } from '@/components/ui/SubmitButton'

interface Props {
  searchParams: Promise<{ message: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { message } = await searchParams

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-slate-100 font-sans p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-10 border border-slate-200">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">HUMSAFAR</h1>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
            Internal Access Only
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 ml-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
              placeholder="name@humsafar.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 ml-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-indigo-600 focus:bg-white outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
              placeholder="••••••••"
            />
          </div>

          {message && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-xs font-bold animate-in fade-in slide-in-from-top-2">
              ⚠️ {message}
            </div>
          )}

          <div className="pt-4">
            <SubmitButton formAction={login}>
              Sign In to Dashboard
            </SubmitButton>
          </div>
        </form>
      </div>
      <div className="mt-8 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
        Powered by Humsafar Community
      </div>
    </div>
  )
}
