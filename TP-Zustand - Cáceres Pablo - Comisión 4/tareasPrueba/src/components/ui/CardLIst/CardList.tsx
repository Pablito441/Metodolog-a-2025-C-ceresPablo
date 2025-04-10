import { FC } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from "./CardList.module.css";
import { useTareas } from "../../../hooks/useTareas";

type ICardList = {
  tarea: ITarea;
  handleOpenModalEdit: (tarea: ITarea) => void;
};

export const CardList: FC<ICardList> = ({ tarea, handleOpenModalEdit }) => {
  const { eliminarTarea } = useTareas();
  const eliminarTareaById = () => {
    eliminarTarea(tarea.id!);
  };
  const editarTarea = () => {
    handleOpenModalEdit(tarea);
  };
  return (
    <div className={styles.containerCard}>
      <div className={styles.containerInfo}>
        <h3>Título: {tarea.titulo}</h3>
        <p>Descripción: {tarea.descripcion}</p>
        <p>
          Fecha límite: <b>{tarea.fechaLimite}</b>
        </p>
      </div>
      <div className={styles.actionCard}>
        <button onClick={editarTarea}>Editar</button>
        <button onClick={eliminarTareaById}>Eliminar</button>
      </div>
    </div>
  );
};
