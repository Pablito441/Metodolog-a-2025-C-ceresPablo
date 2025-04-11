import { FC } from "react";
import { ICurso } from "../../type/ICurso";
import styles from "./CursoCard.module.css";
import { useNavigate } from "react-router-dom";

interface CursoCardProps {
  cursos: ICurso;
}

export const CursoCard: FC<CursoCardProps> = ({ cursos }) => {
  const navigate = useNavigate();
  // Funcion para navegar a la screen de estudiantes (EstudiantesScreen) y pasarle el id del curso como query param
  const handleClick = () => {
    navigate(`/estudiantes?curso=${cursos.id}`);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.titulo}>{cursos.nombre}</h2>
      <div className={styles.info}>
        <p className={styles.descripcion}>
          Estudiantes: <span>{cursos.estudiantes.length}</span>
        </p>
        <button className={styles.iconButton} onClick={handleClick}>
          <span className={`material-symbols-outlined ${styles.icon}`}>
            visibility
          </span>
        </button>
      </div>
    </div>
  );
};
