import { dataProps } from "./ProductsDTO";

export type MyProductsDTO = dataProps & {
  // Adicione aqui as novas propriedades que você precisa
  is_active: boolean;
};

export type MyProductsDataDTO = {
  length: any;
  filter(arg0: (data: any) => any): unknown;
  products: MyProductsDTO[];
};