import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./EstudiantesScreen.module.css";
import { ICurso } from "../../type/ICurso";
import { EstudianteCard } from "../ui/EstudianteCard";
import { getCursoById } from "../../http/api";

export const EstudiantesScreen = () => {
  // Estado para guardar los query params de la url
  const [searchParams] = useSearchParams();
  const cursoId = searchParams.get("curso");
  //Estado para guardar el curso pedido a la API
  const [curso, setCurso] = useState<ICurso | null>(null);

  //Fetch para obtener el curso por id y poder mostrar los estudiantes
  useEffect(() => {
    const fetchCurso = async () => {
      const data = await getCursoById(Number(cursoId));
      setCurso(data);
    };
    fetchCurso();
  }, [cursoId]);
  // Si no se especifica un curso en la url mostramos un mensaje de error
  if (!cursoId) {
    return <h2 className={styles.error}>No se especificó un curso.</h2>;
  }
  //si no se encunetra el curso mostramos el mensaje de cargando
  if (!curso) {
    return <h2 className={styles.cargando}>Cargando estudiantes...</h2>;
  }

  return (
    <div className={styles.pantalla}>
      <div className={styles.containerTitulo}>
        <h1 className={styles.titulo}>Estudiantes de {curso.nombre}</h1>
      </div>
      <div className={styles.containerBody}>
        {/* Mapeamos la lista de estudiantes y lo mostramos uno a uno mediante la Card */}
        {curso.estudiantes.map((estudiante) => (
          <EstudianteCard key={estudiante.id} estudiante={estudiante} />
        ))}
      </div>
    </div>
  );
};
