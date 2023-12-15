import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  selector: 'app-root',
  template: `
      <app-navbar></app-navbar>
      <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-v17';
}
