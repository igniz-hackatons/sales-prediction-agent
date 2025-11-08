export interface ClientsResponse {
  companyName: string;
  email: string;
  name: string;
  percentageOfAgreement: number;
  phone: string;
  sales: SalesResponseData[];
}

export interface SalesResponseData {
  createDate: string;
  name: string;
  price: number;
  reasonOfRefusal: string;
  status: string;
}
