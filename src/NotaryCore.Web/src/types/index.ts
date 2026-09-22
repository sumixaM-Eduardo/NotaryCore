export enum Role {
  Buyer = 0,
  Seller = 1,
}

export const RoleLabels: Record<Role, string> = {
  [Role.Buyer]: 'Comprador (Outorgado)',
  [Role.Seller]: 'Vendedor (Outorgante)',
};

export enum ActType {
  PurchaseAndSale = 0,
}

export const ActTypeLabels: Record<ActType, string> = {
  [ActType.PurchaseAndSale]: 'Escritura de Compra e Venda',
};

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

export type CreatePersonDTO = Omit<Person, 'id'>;

export interface ActPart {
  id: number;
  actId: number;
  personId: number;
  person?: Person;
  role: Role;
}

export interface Protocol {
  id: number;
  openingDate?: string | null;
  status: string;
  acts?: Act[];
}

export type CreateProtocolDTO = {
  openingDate?: string | null;
  status: string;
};

export interface Act {
  id: number;
  protocolId: number;
  type: ActType;
  openingDate?: string | null;
  value: number;
  protocol?: Protocol;
  actParts?: ActPart[];
}

export type CreateActDTO = {
  protocolId: number;
  type: ActType;
  openingDate?: string | null;
  value: number;
};
