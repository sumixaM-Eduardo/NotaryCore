import { useState, useEffect } from 'react';
import { Users, FileText, Scale, Database } from 'lucide-react';
import { personApi, protocolApi, actApi } from '../api/client';

interface DashboardProps {
  onNavigate: (tab: 'persons' | 'protocols' | 'acts') => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [stats, setStats] = useState({
    personsCount: 0,
    protocolsCount: 0,
    actsCount: 0,
    totalValue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [persons, protocols, acts] = await Promise.all([
          personApi.getAll().catch(() => []),
          protocolApi.getAll().catch(() => []),
          actApi.getAll().catch(() => []),
        ]);

        const totalValue = acts.reduce((acc, a) => acc + (Number(a.value) || 0), 0);
        setStats({
          personsCount: persons.length,
          protocolsCount: protocols.length,
          actsCount: acts.length,
          totalValue,
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-800">Painel Geral</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => onNavigate('persons')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pessoas / Partes</span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {isLoading ? '...' : stats.personsCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Outorgantes e outorgados cadastrados</p>
        </div>
        <div
          onClick={() => onNavigate('protocols')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Protocolos</span>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {isLoading ? '...' : stats.protocolsCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Solicitações em andamento no cartório</p>
        </div>
        <div
          onClick={() => onNavigate('acts')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Atos Notariais</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {isLoading ? '...' : stats.actsCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Escrituras e atos lavrados</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Valor Declarado</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-700">
            {isLoading ? '...' : formatCurrency(stats.totalValue)}
          </div>
          <p className="text-xs text-slate-500 mt-1">Montante total movimentado nos atos</p>
        </div>
      </div>
    </div>
  );
}
