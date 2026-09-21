import { useState, useEffect } from 'react';
import { Users, FileText, Scale, ArrowUpRight, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
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
    apiOnline: false,
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
          apiOnline: true,
        });
      } catch {
        setStats((prev) => ({ ...prev, apiOnline: false }));
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
      {/* Banner de Boas-Vindas Didático */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-md">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium mb-4 border border-indigo-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Gestão Notarial & Registral Integrada</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">
            Painel Geral do Cartório
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Gerencie outorgantes e outorgados, monitore a abertura de protocolos e formalize
            atos notariais (compra e venda, procurações e escrituras) com validação de dados em tempo real.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('persons')}
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <span>Gerenciar Pessoas</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('protocols')}
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors border border-white/10"
            >
              <span>Ver Protocolos</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('acts')}
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors border border-white/10"
            >
              <span>Ver Atos Notariais</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Efeito sutil no fundo */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pessoas */}
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

        {/* Protocolos */}
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

        {/* Atos */}
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

        {/* Valor Total */}
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

      {/* Explicação Didática da Arquitetura do Sistema */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 mb-3 flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
          <span>Como as peças do NotaryCore se conectam?</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Em um cartório de notas, cada atendimento segue um fluxo seguro para garantir fé pública aos documentos:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <div className="font-semibold text-slate-800 mb-1 flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Identificação das Partes</span>
            </div>
            <p className="text-slate-500 leading-normal">
              Cadastramos as pessoas físicas ou jurídicas com CPF, RG, estado civil e endereço residencial.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <div className="font-semibold text-slate-800 mb-1 flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Abertura do Protocolo</span>
            </div>
            <p className="text-slate-500 leading-normal">
              O pedido recebe um número de protocolo oficial para rastreabilidade de prazos e conferência documental.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <div className="font-semibold text-slate-800 mb-1 flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Lavratura do Ato</span>
            </div>
            <p className="text-slate-500 leading-normal">
              O ato (ex.: Compra e Venda) é registrado ligando o protocolo, valor do negócio e as partes envolvidas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
