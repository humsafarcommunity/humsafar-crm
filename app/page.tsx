import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-slate-50 font-sans">
      <main className="flex flex-col items-center gap-8 p-8 text-center">
        <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center text-4xl shadow-xl">
          🏔️
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Humsafar Community
          </h1>
          <p className="max-w-md text-lg text-slate-500 font-medium leading-relaxed">
            Welcome to the internal operations hub. 
            Access the CRM to manage leads, batches, and payments.
          </p>
        </div>
        <Link href="/crm">
          <button className="bg-linear-to-br from-indigo-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all active:scale-95">
            Open CRM Dashboard ➜
          </button>
        </Link>
      </main>
    </div>
  );
}
