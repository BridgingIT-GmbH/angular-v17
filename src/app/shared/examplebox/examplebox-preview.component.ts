import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-examplebox-preview',
  standalone: true,
  imports: [CommonModule],
  template: `<h2 class="text-xl mb-4">Vorschau:</h2> <ng-content/>`,
  styles: ``,
})
export class ExampleboxPreviewComponent {}
