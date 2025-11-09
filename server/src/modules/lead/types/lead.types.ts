export interface Purchase {
  date: string;
  price: number;
  category: string;
  product_name: string;
}

export interface Features {
  seasonality_pattern: string;
  preferred_categories: string[];
}

export interface MlResponse {
  client_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  purchases: Purchase[];
  features: Features;
  purchase_probability: number;
  key_factors: string[];
  recommendation_text: string;
}
