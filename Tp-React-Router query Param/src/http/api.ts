import axios from "axios";
import { ICurso } from "../type/ICurso";

const API_URL = "http://localhost:5000/cursos"; //json-server en el puerto 5000

// Funcion para obtener todos los cursos desde la API
export const getAllCursos = async (): Promise<ICurso[]> => {
  try {
    const response = await axios.get<ICurso[]>(API_URL);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching cursos:", error);
    throw error;
  }
};
//Funcion para obtener el curso por el id y poder utilizar /estudiantes?curso={id}
export const getCursoById = async (id: number): Promise<ICurso> => {
  try {
    const response = await axios.get<ICurso>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching curso by ID:", error);
    throw error;
  }
};
