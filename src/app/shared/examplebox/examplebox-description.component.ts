import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-examplebox-description',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  template: `<markdown ngPreserveWhitespaces>
      <ng-content></ng-content>
  </markdown>`,
  styles: ``,
})
export class ExampleboxDescriptionComponent {}
