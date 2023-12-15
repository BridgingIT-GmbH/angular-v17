import { Component, ContentChild, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleboxPreviewComponent } from './examplebox-preview.component';
import { ExampleboxCodeComponent } from './examplebox-code.component';

@Component({
  selector: 'app-examplebox',
  standalone: true,
  imports: [CommonModule],
  template: `
      @if (title) {
          <h1 class="text-2xl m-4">{{ title }}</h1>
      }
      <div class="flex">
          <div class="flex-1">
              <ng-content select="app-examplebox-description" />
          </div>
          @if ( preview || code) {
          <div class="flex-1 p-4">
              <ng-content select="app-examplebox-preview" />
              <ng-content select="app-examplebox-code" />
          </div>
          }
      </div>
  `,
  styles: ``,
})
export class ExampleboxComponent {

  @ContentChild(ExampleboxPreviewComponent)
  preview?: ExampleboxPreviewComponent;

  @ContentChild(ExampleboxCodeComponent)
  code?: ExampleboxCodeComponent;


  @Input()
  title?: string
}

