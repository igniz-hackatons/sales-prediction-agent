export interface IParsedResponse {
  client_id: number;
  name: string;
  phone_number: string;
  email: string;
  created_at: number;
  updated_at: number;
  lossReasons: ILossReason[];
  deals: IDeals[];
}

export interface ILossReason {
  name: string;
}

export interface IDeals {
  name: string;
  price: number;
  created_at: number;
  status: string;
  updated_at: number;
  closed_at: number;
  items: IDealItems[];
}

export interface IDealItems {
  name: string;
  price: number;
}
