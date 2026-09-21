import { useState, useEffect } from 'react';
import { Protocol, CreateProtocolDTO } from '../types';
import { protocolApi } from '../api/client';
import { FileText, PlusCircle, Search, Trash2, AlertCircle, RefreshCw, X, Check, Clock } from 'lucide-react';

export default function ProtocolsList() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<CreateProtocolDTO>({
    status: 'Em Andamento',
    openingDate: new Date().toISOString().split('T')[0],
  });

  const loadProtocols = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await protocolApi.getAll();
      setProtocols(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha ao buscar protocolos';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProtocols();
  }, []);

  const filteredProtocols = protocols.filter((p) =>
    p.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toString().includes(searchQuery)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await protocolApi.create({
        status: formData.status,
        openingDate: formData.openingDate ? new Date(formData.openingDate).toISOString() : new Date().toISOString(),
      });
      setIsModalOpen(false);
      setFormData({
        status: 'Em Andamento',
        openingDate: new Date().toISOString().split('T')[0],
      });
      await loadProtocols();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Erro ao abrir protocolo');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm(`Deseja realmente cancelar/excluir o protocolo #${id}?`)) {
      try {
        await protocolApi.delete(id);
        setProtocols((prev) => prev.filter((p) => p.id !== id));
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Erro ao excluir protocolo');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 font-semibold mb-1">
            <FileText className="w-5 h-5" />
            <span>Fluxo de Atendimento</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Protocolos</h2>
          <p className="text-sm text-slate-500">
            Acompanhe a entrada de solicitações, prazos e tramitação dos atos no cartório.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={loadProtocols}
            disabled={isLoading}
            className="p-2.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Recarregar"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Novo Protocolo</span>
          </button>
        </div>
      </div>

      {/* Alerta de Conexão */}
      {errorMessage && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold">Aviso de Conexão com o Backend</p>
            <p className="text-amber-700 mt-0.5">
              Não foi possível conectar com o endpoint <code>GET /protocols</code> ({errorMessage}).
            </p>
          </div>
        </div>
      )}

      {/* Busca */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por número do protocolo ou status..."
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
        />
      </div>

      {/* Lista */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-2" />
            <p className="text-sm">Carregando protocolos...</p>
          </div>
        ) : filteredProtocols.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="font-medium text-slate-700">Nenhum protocolo registrado</p>
            <p className="text-xs text-slate-400 mt-1">
              Clique em "Novo Protocolo" para abrir uma nova solicitação.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Número</th>
                  <th className="px-6 py-3.5">Data de Abertura</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProtocols.map((protocol) => (
                  <tr key={protocol.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-800">
                      #{protocol.id.toString().padStart(5, '0')}
                    </td>
                    <td className="px-6 py-4 text-slate-600 flex items-center space-x-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>
                        {protocol.openingDate
                          ? new Date(protocol.openingDate).toLocaleDateString('pt-BR')
                          : '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {protocol.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(protocol.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Cancelar protocolo"
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

      {/* Modal Novo Protocolo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg">Abrir Novo Protocolo</h3>
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
                  Data de Abertura
                </label>
                <input
                  type="date"
                  required
                  value={formData.openingDate || ''}
                  onChange={(e) => setFormData({ ...formData, openingDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status Inicial
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="Aberto">Aberto</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Em Exigência">Em Exigência</option>
                  <option value="Pronto para Assinatura">Pronto para Assinatura</option>
                  <option value="Concluído">Concluído</option>
                </select>
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
                  className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>Criar Protocolo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
