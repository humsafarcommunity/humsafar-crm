import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-950 font-sans overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Brand */}
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
           <div className="text-white font-black text-4xl leading-none tracking-tighter mb-2">HUMSAFAR</div>
           <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] font-sans">
              Executive Portal Entry
           </div>
        </div>

        {/* Hero Section */}
        <div className="space-y-6 max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Enterprise Lead Intelligence <br/>
            <span className="text-slate-500">& Operational Velocity.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-lg mx-auto">
            The central operations hub for Humsafar Community. 
            Monitor travel pipelines, manage batches, and drive business growth through data-driven decisions.
          </p>
        </div>

        {/* Action Button */}
        <div className="animate-in zoom-in-95 fade-in duration-700 delay-300">
          <Link href="/crm">
            <button className="group relative px-10 py-5 bg-white text-slate-950 rounded-lg font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-slate-100 transition-all active:scale-95 flex items-center gap-4">
              <span>Enter Executive Workspace</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </Link>
        </div>

        {/* Stats Strip */}
        <div className="mt-24 grid grid-cols-3 gap-12 opacity-50 border-t border-slate-900 pt-12 animate-in fade-in duration-1000 delay-700">
          {[
            { label: "Community", val: "Bhopal" },
            { label: "Status", val: "Live" },
            { label: "Pipeline", val: "Travel" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">{s.label}</div>
              <div className="text-white text-[11px] font-black uppercase tracking-tight">{s.val}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="absolute bottom-8 text-slate-700 text-[9px] font-black uppercase tracking-[0.4em] pointer-events-none">
        Internal Humsafar Operations Infrastructure
      </footer>
    </div>
  );
}
