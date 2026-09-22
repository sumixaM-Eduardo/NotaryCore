import { useState, useEffect } from 'react';
import { Act, ActType, ActTypeLabels, CreateActDTO, Protocol } from '../types';
import { actApi, protocolApi } from '../api/client';
import { Scale, PlusCircle, Search, Trash2, AlertCircle, RefreshCw, X, Check, DollarSign } from 'lucide-react';

export default function ActsList() {
  const [acts, setActs] = useState<Act[]>([]);
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<CreateActDTO>({
    protocolId: 1,
    type: ActType.PurchaseAndSale,
    value: 150000,
    openingDate: new Date().toISOString().split('T')[0],
  });

  const loadData = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const [actsData, protocolsData] = await Promise.all([
        actApi.getAll().catch(() => []),
        protocolApi.getAll().catch(() => []),
      ]);
      setActs(actsData);
      setProtocols(protocolsData);
      if (protocolsData.length > 0 && formData.protocolId === 1) {
        setFormData((prev) => ({ ...prev, protocolId: protocolsData[0].id }));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha ao buscar dados';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredActs = acts.filter((a) =>
    a.id.toString().includes(searchQuery) ||
    a.protocolId.toString().includes(searchQuery)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await actApi.create({
        protocolId: Number(formData.protocolId),
        type: Number(formData.type),
        value: Number(formData.value),
        openingDate: formData.openingDate ? new Date(formData.openingDate).toISOString() : new Date().toISOString(),
      });
      setIsModalOpen(false);
      await loadData();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Erro ao lavrar ato');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm(`Deseja realmente remover o ato notarial #${id}?`)) {
      try {
        await actApi.delete(id);
        setActs((prev) => prev.filter((a) => a.id !== id));
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Erro ao excluir ato');
      }
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Atos Notariais</h2>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={loadData}
            disabled={isLoading}
            className="p-2.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Recarregar"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Novo Ato</span>
          </button>
        </div>
      </div>
      {errorMessage && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm">Não foi possível carregar atos notariais. Tente novamente.</p>
        </div>
      )}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por número do ato ou protocolo..."
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm shadow-sm"
        />
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-600 mb-2" />
            <p className="text-sm">Carregando atos notariais...</p>
          </div>
        ) : filteredActs.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Scale className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="font-medium text-slate-700">Nenhum ato lavrado ainda</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">ID Ato</th>
                  <th className="px-6 py-3.5">Protocolo Vinculado</th>
                  <th className="px-6 py-3.5">Tipo do Ato</th>
                  <th className="px-6 py-3.5">Data de Abertura</th>
                  <th className="px-6 py-3.5">Valor Declarado</th>
                  <th className="px-6 py-3.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredActs.map((act) => (
                  <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-800">
                      #{act.id.toString().padStart(4, '0')}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-blue-600">
                      Protocolo #{act.protocolId}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {ActTypeLabels[act.type] || 'Ato Notarial'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {act.openingDate
                        ? new Date(act.openingDate).toLocaleDateString('pt-BR')
                        : '-'}
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-700">
                      {formatCurrency(act.value)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(act.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remover ato"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg">Lavrar Novo Ato Notarial</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Protocolo Vinculado *
                </label>
                {protocols.length > 0 ? (
                  <select
                    value={formData.protocolId}
                    onChange={(e) => setFormData({ ...formData, protocolId: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {protocols.map((p) => (
                      <option key={p.id} value={p.id}>
                        Protocolo #{p.id} ({p.status})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    required
                    value={formData.protocolId}
                    onChange={(e) => setFormData({ ...formData, protocolId: Number(e.target.value) })}
                    placeholder="Número do Protocolo (ex.: 1)"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-xs"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tipo do Ato
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value={ActType.PurchaseAndSale}>Escritura de Compra e Venda</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Valor Declarado (R$) *
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    placeholder="0.00"
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Data de Abertura
                </label>
                <input
                  type="date"
                  required
                  value={formData.openingDate || ''}
                  onChange={(e) => setFormData({ ...formData, openingDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium shadow-sm transition-colors"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>Registrar Ato</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
