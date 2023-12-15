import { Component, computed, HostBinding, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      @for (item of navItems;track $index) {
          <a [ngClass]="{ 'font-bold bg-blue-700': (router.url === item.route)}"
             class="h-14 hover:text-blue-300  hover:bg-blue-800 inline-flex justify-center items-center px-4"
             [routerLink]="item.route">{{ item.label }}</a>
      }
  `,
  styles: ``,
})
export class NavbarComponent {
  navItems: {route: string, label: string}[] = [
    {route: '/', label: 'Base'},
    {route: '/standalone', label: 'Standalone'},
    {route: '/signals', label: 'Signals'},
    {route: '/controlflow', label: 'Control Flow'},
    {route: '/deferredviews', label: 'Deferred Views'}
  ];
  router = inject(Router);

  @HostBinding('class')
  get classes() {
    return 'flex bg-blue-600 text-white'
  }
}
