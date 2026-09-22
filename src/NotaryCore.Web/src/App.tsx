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
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
        {activeTab === 'persons' && <PersonsList />}
        {activeTab === 'protocols' && <ProtocolsList />}
        {activeTab === 'acts' && <ActsList />}
      </main>
    </div>
  );
}
