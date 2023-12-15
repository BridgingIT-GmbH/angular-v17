import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-examplebox-code',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  template: '<h2 class="text-xl">Source:</h2> <markdown>```typescript\n <ng-content/></markdown>',
  styles: ``,
})
export class ExampleboxCodeComponent {}
