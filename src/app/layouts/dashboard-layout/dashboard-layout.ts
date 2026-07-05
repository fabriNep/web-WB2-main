import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { Sidebar } from "../sidebar/sidebar";


@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule, MatSidenavModule, Navbar, Sidebar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  isMobile = false;
  opened = true;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
      this.opened = !result.matches;
    });
  }

  toggle(): void {
    this.opened = !this.opened;
  }
}