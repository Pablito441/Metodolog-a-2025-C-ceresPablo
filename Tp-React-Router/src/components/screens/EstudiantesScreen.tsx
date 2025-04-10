import { useLocation } from "react-router-dom";
import styles from "./EstudiantesScreen.module.css";
import { FC } from "react";
import { ICurso } from "../../type/ICurso";
import { EstudianteCard } from "../ui/EstudianteCard";

export const EstudiantesScreen: FC = () => {
  const location = useLocation();
  const curso = location.state as ICurso;

  return (
    <div className={styles.pantalla}>
      <div className={styles.containerTitulo}>
        <h1 className={styles.titulo}>Estudiantes de {curso.nombre}</h1>
      </div>
      <div className={styles.containerBody}>
        {curso.estudiantes.map((estudiante) => (
          <EstudianteCard key={estudiante.id} estudiante={estudiante} />
        ))}
      </div>
    </div>
  );
};
