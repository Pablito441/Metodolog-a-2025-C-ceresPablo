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
