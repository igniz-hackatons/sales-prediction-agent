export interface Purchase {
  category: string;
  date: string;
  price: number;
  product_name: string;
}

export interface Customer {
  client_id: number;
  email: string;
  first_name: string;
  key_factors: string[];
  last_name: string;
  phone_number: string;
  purchase_probability: number;
  purchases: Purchase[];
  recommendation_text: string;
  features: {
    seasonality_pattern: string,
    preferred_categories: string[]
  },
}
