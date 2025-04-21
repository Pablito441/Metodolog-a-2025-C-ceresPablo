import { useShallow } from "zustand/shallow";
import { tareaStore } from "../store/tareaStore";
import {
  editarTarea,
  eliminarTareaPorID,
  getAllTareas,
  postNuevaTarea,
} from "../http/tareas";
import { ITarea } from "../types/ITarea";
import Swal from "sweetalert2";
export const useTareas = () => {
  const {
    tareas,
    setArrayTareas,
    agregarNuevaTarea,
    eliminarUnaTarea,
    editarUnaTarea,
  } = tareaStore(
    useShallow((state) => ({
      tareas: state.tareas,
      setArrayTareas: state.setArrayTareas,
      agregarNuevaTarea: state.agregarNuevaTarea,
      eliminarUnaTarea: state.eliminarUnaTarea,
      editarUnaTarea: state.editarUnaTarea,
    }))
  );

  const getTareas = async () => {
    const response = await getAllTareas();
    if (response) {
      setArrayTareas(response);
    }
  };

  const crearTarea = async (nuevaTarea: ITarea) => {
    agregarNuevaTarea(nuevaTarea);
    try {
      await postNuevaTarea(nuevaTarea);
      Swal.fire("Exito", "Tarea creada correctamente", "success");
    } catch (error) {
      eliminarUnaTarea(nuevaTarea.id!);
      console.log("algo salio mal al crear l atare2", error);
    }
  };
  const putTareaEditar = async (tareaEditada: ITarea) => {
    const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);
    editarUnaTarea(tareaEditada);
    try {
      await editarTarea(tareaEditada);
      Swal.fire("Exito", "Tarea actualizada correctamente", "success");
    } catch (error) {
      if (estadoPrevio) editarUnaTarea(estadoPrevio);

      console.log("algo salio mal al editar", error);
    }
  };
  const eliminarTarea = async (idTarea: string) => {
    const estadoPrevio = tareas.find((el) => el.id === idTarea);
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!confirm.isConfirmed) return;
    eliminarUnaTarea(idTarea);
    try {
      await eliminarTareaPorID(idTarea);
      Swal.fire("Eliminado", "La tarea se eliminó correctamente", "success");
    } catch (error) {
      if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
      console.log("algo salio mal al editar", error);
    }
  };
  return {
    getTareas,
    crearTarea,
    putTareaEditar,
    eliminarTarea,
    tareas,
  };
};
