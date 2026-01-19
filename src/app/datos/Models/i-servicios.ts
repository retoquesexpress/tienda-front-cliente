import { ICategorias } from "./i-categorias";

export interface IServicios {
  idService: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  category: ICategorias;
}
