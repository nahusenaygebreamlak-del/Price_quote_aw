export type ThemeColor = 'blue' | 'indigo' | 'emerald' | 'rose' | 'amber' | 'slate';

export interface CompanyDetails {
  companyName: string;
  companyNameEnabled: boolean;
  logo: string; // Base64 string or URL
}

export interface CompanyAddress {
  buildingNumber: string;
  street: string;
  townCity: string;
  county: string;
  state: string;
  zipCode: string;
}

export interface ContactInfo {
  tel: string;
  fax: string;
  email: string;
  website: string;
}

export interface ContactPerson {
  name: string;
  tel: string;
}

export interface CountrySettings {
  taxName: string; 
  vatPercentage: string;
  currencySymbol: string;
}

export interface CustomerDetails {
  name: string;
  companyName: string;
  address: string;
  cityStateZip: string;
  phone: string;
  customerId: string;
}

export interface QuoteDetails {
  quoteNumber: string;
  date: string;
  validUntil: string;
  description: string;
  terms: string;
}

export interface LineItem {
  description: string;
  number: number;
  type: string;
  rate: number;
}

export interface FinancialTotals {
  subtotal: string;
  discount: string;
  vatRate: string;
  vatAmount: string;
  total: string;
}

export interface AppState {
  details: CompanyDetails;
  address: CompanyAddress;
  contact: ContactInfo;
  person: ContactPerson;
  country: CountrySettings;
  
  // New Fields
  customer: CustomerDetails;
  quote: QuoteDetails;
  items: LineItem[];
  totals: FinancialTotals;
}