export interface Owner {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  id_number: string;
  date_of_birth: string;
  address: string;
  county: string;
  sub_county: string;
  ward: string;
  gender: string;
  occupation: string;
  country: string;
  scanned_id_card: string;
  passport_photo: string;
}

export interface Pet {
  name: string;
  type: string;
  breed: string;
  gender: string;
  date_of_birth: string;
  microchip_number: string;
  cover_type: string;
  neutered: boolean;
  vaccinated: boolean;
  cover_amount: number;
  premium: number;
  ownership_document: string;
}

export interface PaymentDetails {
  payment_method: string;
  bank_name: string;
  account_type: string;
  account_name: string;
  account_number: string;
  branch_code: string;
  debit_order_date: string;
  source_of_funds: string;
}

export interface Beneficiary {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  phone_number: string;
  id_number: string;
  relationship: string;
  percentage: number;
  date_of_birth: string;
}

export interface InsuranceData {
  product: string;
  product_type: string;
  start_date: string;
  owner: Owner;
  pets: Pet[];
  payment_details: PaymentDetails;
  beneficiaries: Beneficiary[];
}