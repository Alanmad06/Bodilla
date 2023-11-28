export interface Traje {
    id? : string;
    name: string;
    description: string;
    image: string;
    image_aux?:string;
    coste: number;
}
  
export interface Menu {
    id?: string;
    name: string;
    description: string;
    image: string;
    image_aux?: string
    hour: number;
}

export interface centroMesa {
    id?: string;
    name: string;
    description: string;
    image: string;
    image_aux : string;
    coste: number;
}
