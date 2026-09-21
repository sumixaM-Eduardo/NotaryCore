import { useState, useEffect } from 'react';
import { Person, CreatePersonDTO } from '../types';
import { personApi } from '../api/client';
import { Users, UserPlus, Search, Trash2, AlertCircle, RefreshCw, X, Check } from 'lucide-react';

export default function PersonsList() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Controle do modal de cadastro
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Estado do formulário de nova pessoa
  const [formData, setFormData] = useState<CreatePersonDTO>({
    name: '',
    cpf: '',
    rg: '',
    cnpj: '',
    nationality: 'Brasileira',
    address: '',
    dateBirth: '',
  });

  // Função para buscar as pessoas na API ASP.NET Core
  const loadPersons = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await personApi.getAll();
      setPersons(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Falha ao conectar à API';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega ao montar o componente
  useEffect(() => {
    loadPersons();
  }, []);

  // Filtragem local por nome ou CPF
  const filteredPersons = persons.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.cpf.includes(q);
  });

  // Manipulador de envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.cpf.trim()) {
      alert('Nome e CPF são campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    try {
      await personApi.create({
        ...formData,
        dateBirth: formData.dateBirth ? new Date(formData.dateBirth).toISOString() : null,
      });
      // Fecha modal, limpa form e recarrega
      setIsModalOpen(false);
      setFormData({
        name: '',
        cpf: '',
        rg: '',
        cnpj: '',
        nationality: 'Brasileira',
        address: '',
        dateBirth: '',
      });
      await loadPersons();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Erro ao cadastrar pessoa');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Exclusão de pessoa
  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Deseja realmente remover "${name}"?`)) {
      try {
        await personApi.delete(id);
        setPersons((prev) => prev.filter((p) => p.id !== id));
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : 'Erro ao excluir pessoa');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-semibold mb-1">
            <Users className="w-5 h-5" />
            <span>Módulo de Cadastro</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Pessoas & Partes</h2>
          <p className="text-sm text-slate-500">
            Gerencie outorgantes, outorgados e intervenientes participantes de atos notariais.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={loadPersons}
            disabled={isLoading}
            className="p-2.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Recarregar dados"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <UserPlus className="w-5 h-5" />
            <span>Nova Pessoa</span>
          </button>
        </div>
      </div>

      {/* Alerta de Erro de Conexão com Explicação Didática */}
      {errorMessage && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold">Aviso de Conexão com o Backend</p>
            <p className="text-amber-700 mt-0.5">
              Não foi possível conectar com o endpoint <code>GET /persons</code> da API ASP.NET Core ({errorMessage}).
            </p>
            <p className="text-xs text-amber-600 mt-2">
              💡 <em>Dica de aprendizado</em>: Para que os dados venham do banco PostgreSQL, a API em C# deve estar em execução (porta 5257).
            </p>
          </div>
        </div>
      )}

      {/* Barra de Busca */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por nome ou CPF..."
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm shadow-sm"
        />
      </div>

      {/* Tabela de Pessoas */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-slate-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-indigo-600 mb-2" />
            <p className="text-sm">Carregando pessoas cadastradas...</p>
          </div>
        ) : filteredPersons.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="font-medium text-slate-700">Nenhuma pessoa encontrada</p>
            <p className="text-xs text-slate-400 mt-1">
              {searchQuery ? 'Tente buscar com outro termo.' : 'Clique em "Nova Pessoa" para iniciar o cadastro.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">ID</th>
                  <th className="px-6 py-3.5">Nome</th>
                  <th className="px-6 py-3.5">CPF / CNPJ</th>
                  <th className="px-6 py-3.5">Nacionalidade</th>
                  <th className="px-6 py-3.5">Endereço</th>
                  <th className="px-6 py-3.5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPersons.map((person) => (
                  <tr key={person.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">#{person.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{person.name}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">
                      {person.cpf || person.cnpj || '-'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{person.nationality}</td>
                    <td className="px-6 py-4 text-slate-500 truncate max-w-xs">{person.address}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(person.id, person.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remover"
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

      {/* Modal de Nova Pessoa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg">Cadastrar Nova Pessoa</h3>
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
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex.: Maria de Souza Oliveira"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CPF *</label>
                  <input
                    type="text"
                    required
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">RG</label>
                  <input
                    type="text"
                    value={formData.rg || ''}
                    onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                    placeholder="00.000.000-0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nacionalidade</label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Data de Nascimento</label>
                  <input
                    type="date"
                    value={formData.dateBirth || ''}
                    onChange={(e) => setFormData({ ...formData, dateBirth: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Endereço Residencial</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Rua, Número, Bairro, Cidade - UF"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition-colors"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>Salvar Pessoa</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
