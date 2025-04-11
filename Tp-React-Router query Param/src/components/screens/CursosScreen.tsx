import { useEffect, useState } from "react";
import { getAllCursos } from "../../http/api";
import { ICurso } from "../../type/ICurso";
import styles from "./CursosScreen.module.css";
import { CursoCard } from "../ui/CursoCard";

export const CursosScreen = () => {
  //Estado para guardar los cursos pedidos a la API
  const [dataCursos, setDataCursos] = useState<ICurso[]>([]);

  //Buscamos los cursos al cargar el componente
  useEffect(() => {
    const fetchCursos = async () => {
      const data = await getAllCursos();
      setDataCursos(data);
    };
    fetchCursos();
  }, []);

  return (
    <>
      <div className={styles.containerTitulo}>
        <h1 className={styles.titulo}>CURSOS</h1>
      </div>
      <div className={styles.containerBody}>
        {/* Mostramos todos los cursos con un .map */}
        {dataCursos.map((curso) => (
          <CursoCard key={curso.id} cursos={curso} />
        ))}
      </div>
    </>
  );
};
