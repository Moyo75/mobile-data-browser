export interface Product {
  id: string;
  plan: Plan;
  carrier: Carrier;
}

export type Carrier = {
  name: string;
  imageUrl: string;
  country_code: string;
};

export type Plan = {
  expiry_type: string;
  size: string;
  unit: string;
  tnc_url: string;
};
