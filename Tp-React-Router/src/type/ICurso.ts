import { IEstudiante } from "./IEstudiante";

export type ICurso = {
  id: number;
  nombre: string;
  estudiantes: IEstudiante[];
};
