import { FC } from "react";
import { IEstudiante } from "../../type/IEstudiante";
import styles from "./EstudianteCard.module.css";

interface EstudianteCardProps {
  estudiante: IEstudiante;
}
// Recibe un estudiante como prop y lo muestra en uan tarjeta
export const EstudianteCard: FC<EstudianteCardProps> = ({ estudiante }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.titulo}>{estudiante.nombre}</h2>
      <p className={styles.descripcion}>Edad: {estudiante.edad}</p>
    </div>
  );
};
