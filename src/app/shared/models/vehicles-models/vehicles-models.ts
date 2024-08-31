export interface IVehicle {
  id: string | number;
  licensePlate: string;
  chassi: string;
  renavam: string;
  model: string;
  carBrand: number;
  year: string;
  category: number;
  image: string | ArrayBuffer;
}

export type INewVehicle = Omit<IVehicle, 'id'>;
