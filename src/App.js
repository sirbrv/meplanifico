import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./componets/Layout/Layout";
import Inicio from "./pages/Inicio";
import Register from "./pages/Register";
import LoginSistema from "./pages/administracion/users/Login";
import CambioClave from "./pages/administracion/users/CambioClave";
import ListarUsers from "./pages/administracion/users/ListarUsers";
import ListarCondicionGasto from "./pages/administracion/condicionGastos/ListarCondicionGasto";
import ListarCondicionIngreso from "./pages/administracion/condicionIngresos/ListarCondicionIngreso";
import ListarGrupoGasto from "./pages/administracion/grupoGastos/ListarGrupoGasto";
import ListarTipoGasto from "./pages/administracion/tipoGastos/ListarTipoGasto";
import ListarTipoIngreso from "./pages/administracion/tipoIngresos/ListarTipoIngreso";
import ListarIngreso from "./pages/ingresos/ListarIngresos";
import ListarGasto from "./pages/gastos/ListarGastos";
import EdoCta from "./pages/report/EdaCuenta";
import Planes from "./pages/report/Planes";
import ListarPlanes from "./pages/planes/ListarPlanes";
import ListarContactos from "./pages/administracion/contactos/ListarContac";
import Contacto from "./pages/Contacto";
import Salir from "./pages/Salir";
import "./App.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/salir" element={<Salir />} />
            <Route path="/contact" element={<Contacto />} />
            <Route path="/admin/contact" element={<ListarContactos />} />
            <Route path="/admin/users" element={<ListarUsers />} />
            <Route path="/acceso/cambioClave" element={<CambioClave />} />
            <Route path="/acceso/register" element={<Register />} />
            <Route path="/acceso/login" element={<LoginSistema />} />

            <Route path="/admin/grupoGasto" element={<ListarGrupoGasto />} />
            <Route path="/admin/tipoGasto" element={<ListarTipoGasto />} />
            <Route path="/admin/tipoIngreso" element={<ListarTipoIngreso />} />
            <Route
              path="/admin/condicionGasto"
              element={<ListarCondicionGasto />}
            />
            <Route
              path="/admin/condicionIngreso"
              element={<ListarCondicionIngreso />}
            />
            <Route path="/gestion/ingreso" element={<ListarIngreso />} />
            <Route path="/gestion/gasto" element={<ListarGasto />} />
            <Route path="/gestion/planes" element={<ListarPlanes />} />
            <Route path="/report/EdaCuenta" element={<EdoCta />} />
            <Route path="/report/Planes" element={<Planes />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
