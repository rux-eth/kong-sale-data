export interface SaleData {
  current_price: number | null | "bundle";
  currency: string | null | "bundle";
}
export interface KongTraits {
  cumulative: number;
  shooting: number;
  vision: number;
  finish: number;
  defense: number;
  background: string;
  fur: string;
  mouth: string;
  eyes: string;
  clothes: string | null;
  head: string | null;
  head_accessory: string | null;
  jewellery: string | null;
}
export interface KongData extends SaleData, KongTraits {
  token_id: number;
  name: string;
  bio: string | null;
}
