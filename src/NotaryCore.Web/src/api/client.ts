import { Person, CreatePersonDTO, Protocol, CreateProtocolDTO, Act, CreateActDTO } from '../types';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Erro na API (${response.status}): ${errorText || response.statusText}`);
  }
  if (response.status === 204) {
    return {} as T;
  }
  return response.json();
}

export const personApi = {
  async getAll(): Promise<Person[]> {
    const res = await fetch('/persons');
    return handleResponse<Person[]>(res);
  },

  async getById(id: number): Promise<Person> {
    const res = await fetch(`/persons/${id}`);
    return handleResponse<Person>(res);
  },

  async create(data: CreatePersonDTO): Promise<Person> {
    const res = await fetch('/persons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Person>(res);
  },

  async update(id: number, data: Partial<Person>): Promise<Person> {
    const res = await fetch(`/persons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Person>(res);
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`/persons/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(res);
  },
};

export const protocolApi = {
  async getAll(): Promise<Protocol[]> {
    const res = await fetch('/protocols');
    return handleResponse<Protocol[]>(res);
  },

  async getById(id: number): Promise<Protocol> {
    const res = await fetch(`/protocols/${id}`);
    return handleResponse<Protocol>(res);
  },

  async create(data: CreateProtocolDTO): Promise<Protocol> {
    const res = await fetch('/protocols', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Protocol>(res);
  },

  async update(id: number, data: Partial<Protocol>): Promise<void> {
    const res = await fetch(`/protocols/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<void>(res);
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`/protocols/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(res);
  },
};

export const actApi = {
  async getAll(): Promise<Act[]> {
    const res = await fetch('/acts');
    return handleResponse<Act[]>(res);
  },

  async getById(id: number): Promise<Act> {
    const res = await fetch(`/acts/${id}`);
    return handleResponse<Act>(res);
  },

  async create(data: CreateActDTO): Promise<Act> {
    const res = await fetch('/acts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<Act>(res);
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`/acts/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(res);
  },
};
