import { Navigate, Route, Routes } from "react-router-dom";
import { CursosScreen } from "../components/screens/CursosScreen";
import { EstudiantesScreen } from "../components/screens/EstudiantesScreen";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/cursos" element={<CursosScreen />} />
      <Route path="/estudiantes" element={<EstudiantesScreen />} />
      <Route path="*" element={<Navigate to="/cursos" replace />} />
    </Routes>
  );
};
