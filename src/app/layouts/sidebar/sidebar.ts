import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authService = inject(AuthService);

  adminItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/app/dashboard' },
    { label: 'Usuarios', icon: 'people', route: '/app/usuarios' },
    { label: 'Empresas', icon: 'business', route: '/app/empresas' },
    { label: 'Empleados', icon: 'badge', route: '/app/empleados' },
    { label: 'Registros de bienestar', icon: 'monitor_heart', route: '/app/registros' },
    { label: 'Alertas', icon: 'notifications_active', route: '/app/alertas' },
    { label: 'Recomendaciones', icon: 'lightbulb', route: '/app/recomendaciones' },
    { label: 'Evaluaciones', icon: 'fact_check', route: '/app/evaluaciones' },
    { label: 'Chatbot', icon: 'smart_toy', route: '/app/chatbot' }
  ];

  userItems: NavItem[] = [
    { label: 'Mi Dashboard', icon: 'dashboard', route: '/app/dashboard' },
    { label: 'Mi Bienestar', icon: 'monitor_heart', route: '/app/registros' },
    { label: 'Mis Alertas', icon: 'notifications_active', route: '/app/alertas' },
    { label: 'Mis Recomendaciones', icon: 'lightbulb', route: '/app/recomendaciones' },
    { label: 'Mis Evaluaciones', icon: 'fact_check', route: '/app/evaluaciones' },
    { label: 'Chatbot', icon: 'smart_toy', route: '/app/chatbot' }
  ];

  get navItems(): NavItem[] {
    return this.authService.isAdmin() ? this.adminItems : this.userItems;
  }
}