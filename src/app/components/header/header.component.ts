import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isSidebarOpen = false;
  isMobileDashboardOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isMobileDashboardOpen = false;
  }

  toggleMobileDashboard() {
    this.isMobileDashboardOpen = !this.isMobileDashboardOpen;
  }
}
