export interface IParsedResponse {
  client_id: number;
  name: string;
  phone_number: string;
  email: string;
  created_at: number;
  updated_at: number;
  deals: IDeal[];
}

export interface ILossReason {
  name: string;
}

export interface IDeal {
  name: string;
  price: number;
  created_at: number;
  status: string;
  updated_at: number;
  closed_at: number;
  lossReason: ILossReason;
  items: IDealItems[];
}

export interface IDealItems {
  name: string;
  price: number;
}