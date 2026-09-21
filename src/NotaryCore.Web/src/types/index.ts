/**
 * Papéis que uma pessoa pode desempenhar em um ato notarial.
 * Espelha o enum Role do C# (NotaryCore.Domain.Enums.Role).
 */
export enum Role {
  Buyer = 0,  // Comprador (Outorgado)
  Seller = 1, // Vendedor (Outorgante)
}

export const RoleLabels: Record<Role, string> = {
  [Role.Buyer]: 'Comprador (Outorgado)',
  [Role.Seller]: 'Vendedor (Outorgante)',
};

/**
 * Tipos de Atos Notariais.
 * Espelha o enum AcType do C# (NotaryCore.Domain.Enums.AcType).
 */
export enum ActType {
  PurchaseAndSale = 0, // Compra e Venda
}

export const ActTypeLabels: Record<ActType, string> = {
  [ActType.PurchaseAndSale]: 'Escritura de Compra e Venda',
};

/**
 * Representa uma Pessoa (Física ou Jurídica).
 * Espelha a entidade Person (NotaryCore.Domain.Entities.Person).
 */
export interface Person {
  id: number;
  cpf: string;
  name: string;
  cnpj?: string | null;
  rg?: string | null;
  nationality: string;
  dateBirth?: string | null;
  address: string;
}

/**
 * Dados necessários para cadastrar uma nova pessoa.
 */
export type CreatePersonDTO = Omit<Person, 'id'>;

/**
 * Representa a vinculação de uma parte (pessoa + papel) a um ato notarial.
 * Espelha a entidade ActPart (NotaryCore.Domain.Entities.ActPart).
 */
export interface ActPart {
  id: number;
  actId: number;
  personId: number;
  person?: Person;
  role: Role;
}

/**
 * Representa um Protocolo de atendimento no cartório.
 * Espelha a entidade Protocol (NotaryCore.Domain.Entities.Protocol).
 */
export interface Protocol {
  id: number;
  openingDate?: string | null;
  status: string;
  acts?: Act[];
}

/**
 * Dados para criação de um novo protocolo.
 */
export type CreateProtocolDTO = {
  openingDate?: string | null;
  status: string;
};

/**
 * Representa um Ato Notarial (ex.: Escritura de Compra e Venda).
 * Espelha a entidade Act (NotaryCore.Domain.Entities.Act).
 */
export interface Act {
  id: number;
  protocolId: number;
  type: ActType;
  openingDate?: string | null;
  value: number;
  protocol?: Protocol;
  actParts?: ActPart[];
}

/**
 * Dados para criação de um novo ato notarial.
 */
export type CreateActDTO = {
  protocolId: number;
  type: ActType;
  openingDate?: string | null;
  value: number;
};
