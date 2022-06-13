import { Category } from "./category";

export interface Transaction {
    id?: string,
    cantidad?: number,
    fecha?: string,
    tipo?: string,
    cuenta?: string
}