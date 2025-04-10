import { useEffect, useState } from "react";
import { getAllCursos } from "../../http/api";
import { ICurso } from "../../type/ICurso";
import styles from "./CursosScreen.module.css";
import { CursoCard } from "../ui/CursoCard";

export const CursosScreen = () => {
  const [dataCursos, setDataCursos] = useState<ICurso[]>([]);

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
        {dataCursos.map((curso) => (
          <CursoCard key={curso.id} cursos={curso} />
        ))}
      </div>
    </>
  );
};
