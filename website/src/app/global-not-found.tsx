import '#/styles/global.css';
import Link from 'next/link';
import { Compass, Home, LayoutTemplate, Code2, Sparkles } from 'lucide-react';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fafbfc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-sans antialiased flex items-center justify-center p-4">
        <main className="w-full max-w-2xl rounded-3xl border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-[6px_6px_0px_#334155] dark:shadow-[6px_6px_0px_#475569] space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffe600] text-slate-900 border border-slate-700 font-mono text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>404 // PAGE NOT FOUND</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              ROUTE NOT FOUND
            </h1>
            <p className="text-sm font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
              The MonoForge URL you requested could not be resolved. Choose one of our active workspaces below to continue building your GitHub profile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs font-bold">
            <Link
              href="/en"
              className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#ffe600] hover:bg-amber-300 text-slate-900 border-2 border-slate-800 shadow-[3px_3px_0px_#334155] transition-all"
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>MonoForge Home (/en)</span>
            </Link>
            <Link
              href="/en/templates"
              className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 transition-all"
            >
              <LayoutTemplate className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Curated Templates</span>
            </Link>
            <Link
              href="/en/developer"
              className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 transition-all"
            >
              <Code2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Developer IDE</span>
            </Link>
            <Link
              href="/en/visualizer"
              className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Visualizer Studio</span>
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
