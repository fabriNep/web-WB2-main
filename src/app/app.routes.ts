import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { authGuard } from './guards/auth-guard';
import { Home } from './pages/dashboard/home/home';
import { ListarUsuarios } from './pages/usuarios/listar-usuarios/listar-usuarios';
import { adminGuard } from './guards/admin-guard';
import { EditarUsuario } from './pages/usuarios/editar-usuario/editar-usuario';
import { ListarEmpresas } from './pages/empresas/listar-empresas/listar-empresas';
import { CrearEmpresa } from './pages/empresas/crear-empresa/crear-empresa';
import { EditarEmpresa } from './pages/empresas/editar-empresa/editar-empresa';
import { ListarEmpleados } from './pages/empleados/listar-empleados/listar-empleados';
import { CrearEmpleado } from './pages/empleados/crear-empleado/crear-empleado';
import { EditarEmpleado } from './pages/empleados/editar-empleado/editar-empleado';
import { ListarRegistros } from './pages/registros/listar-registros/listar-registros';
import { CrearRegistro } from './pages/registros/crear-registro/crear-registro';
import { EditarRegistro } from './pages/registros/editar-registro/editar-registro';
import { ListarAlertas } from './pages/alertas/listar-alertas/listar-alertas';
import { CrearAlerta } from './pages/alertas/crear-alerta/crear-alerta';
import { EditarAlerta } from './pages/alertas/editar-alerta/editar-alerta';
import { ListarRecomendaciones } from './pages/recomendaciones/listar-recomendaciones/listar-recomendaciones';
import { CrearRecomendacion } from './pages/recomendaciones/crear-recomendacion/crear-recomendacion';
import { EditarRecomendacion } from './pages/recomendaciones/editar-recomendacion/editar-recomendacion';
import { ListarEvaluaciones } from './pages/evaluaciones/listar-evaluaciones/listar-evaluaciones';
import { CrearEvaluacion } from './pages/evaluaciones/crear-evaluacion/crear-evaluacion';
import { EditarEvaluacion } from './pages/evaluaciones/editar-evaluacion/editar-evaluacion';
import { Chatbot } from './pages/chatbot/chatbot/chatbot';
import { perfilGuard } from './guards/perfil-guard';
import { CompletarPerfil } from './pages/perfil/completar-perfil/completar-perfil';
import { Landing } from './pages/landing/landing';
import { guestGuard } from './guards/guest-guard';
import { notFoundGuard } from './guards/not-found-guard';

export const routes: Routes = [
    { path: '', component: Landing, title: 'WellnessBuddy' },
    { path: 'auth/login', component: Login, canActivate: [guestGuard] },
    { path: 'auth/register', component: Register, canActivate: [guestGuard] },
    {
        path: 'completar-perfil',
        component: CompletarPerfil,
        canActivate: [authGuard]
    },
    {
        path: 'app',
        component: DashboardLayout,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: Home, canActivate: [perfilGuard] },

            { path: 'usuarios', component: ListarUsuarios, canActivate: [adminGuard] },
            { path: 'usuarios/editar/:id', component: EditarUsuario, canActivate: [adminGuard] },

            { path: 'empresas', component: ListarEmpresas, canActivate: [adminGuard] },
            { path: 'empresas/crear', component: CrearEmpresa, canActivate: [adminGuard] },
            { path: 'empresas/editar/:id', component: EditarEmpresa, canActivate: [adminGuard] },

            { path: 'empleados', component: ListarEmpleados, canActivate: [adminGuard] },
            { path: 'empleados/crear', component: CrearEmpleado, canActivate: [adminGuard] },
            { path: 'empleados/editar/:id', component: EditarEmpleado, canActivate: [adminGuard] },

            { path: 'registros', component: ListarRegistros, canActivate: [perfilGuard] },
            { path: 'registros/crear', component: CrearRegistro, canActivate: [perfilGuard] },
            { path: 'registros/editar/:id', component: EditarRegistro, canActivate: [perfilGuard] },

            { path: 'alertas', component: ListarAlertas, canActivate: [perfilGuard] },
            { path: 'alertas/crear', component: CrearAlerta, canActivate: [adminGuard] },
            { path: 'alertas/editar/:id', component: EditarAlerta, canActivate: [adminGuard] },

            { path: 'recomendaciones', component: ListarRecomendaciones, canActivate: [perfilGuard] },
            { path: 'recomendaciones/crear', component: CrearRecomendacion, canActivate: [perfilGuard] },
            { path: 'recomendaciones/editar/:id', component: EditarRecomendacion, canActivate: [perfilGuard] },

            { path: 'evaluaciones', component: ListarEvaluaciones, canActivate: [perfilGuard] },
            { path: 'evaluaciones/crear', component: CrearEvaluacion, canActivate: [perfilGuard] },
            { path: 'evaluaciones/editar/:id', component: EditarEvaluacion, canActivate: [perfilGuard] },

            { path: 'chatbot', component: Chatbot, canActivate: [perfilGuard] },

            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
    },
    { path: '**', component: Landing, canActivate: [notFoundGuard] },
];