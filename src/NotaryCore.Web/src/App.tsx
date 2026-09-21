import { useState } from 'react';
import { Scale, Users, FileText, LayoutDashboard } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PersonsList from './components/PersonsList';
import ProtocolsList from './components/ProtocolsList';
import ActsList from './components/ActsList';

type NavigationTab = 'dashboard' | 'persons' | 'protocols' | 'acts';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Barra de Navegação Superior */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo e Título */}
            <div
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center space-x-3 cursor-pointer select-none"
            >
              <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg text-slate-950 shadow-sm">
                <Scale className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                  NotaryCore
                </h1>
                <span className="text-[10px] tracking-wider text-slate-400 uppercase font-semibold">
                  Cartório de Notas
                </span>
              </div>
            </div>

            {/* Menu de Abas */}
            <nav className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-slate-800 text-white shadow-inner border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Painel Geral</span>
              </button>

              <button
                onClick={() => setActiveTab('persons')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'persons'
                    ? 'bg-slate-800 text-white shadow-inner border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Pessoas</span>
              </button>

              <button
                onClick={() => setActiveTab('protocols')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'protocols'
                    ? 'bg-slate-800 text-white shadow-inner border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Protocolos</span>
              </button>

              <button
                onClick={() => setActiveTab('acts')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'acts'
                    ? 'bg-slate-800 text-white shadow-inner border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span className="hidden sm:inline">Atos Notariais</span>
              </button>
            </nav>

            {/* Status do Front-end */}
            <div className="hidden md:flex items-center space-x-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-full text-slate-300 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vite + React 19</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Dinâmico */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
        {activeTab === 'persons' && <PersonsList />}
        {activeTab === 'protocols' && <ProtocolsList />}
        {activeTab === 'acts' && <ActsList />}
      </main>

      {/* Rodapé */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>NotaryCore &bull; Sistema de Automação e Gestão Cartorária</span>
          <span className="text-slate-500 font-mono text-[11px]">
            API: http://localhost:5257 &bull; Web: http://localhost:5173
          </span>
        </div>
      </footer>
    </div>
  );
}
