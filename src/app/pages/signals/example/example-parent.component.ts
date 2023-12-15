import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ExampleChildValueComponent } from './example-child-value.component';
import { ExampleChildButtonComponent } from './example-child-button.component';

@Component({
  selector: 'app-signal-example-parent',
  standalone: true,
  template: `
      <h3 class="font-bold mb-4">Beispiel1: Komponentenübergreifende Signals</h3>
      <div class="flex justify-center items-center gap-8 p-8 border my-4">
          <app-signal-example-child-value [counter]='counter' [counterDoubled]="counterDoubled" />
          <app-signal-example-child-button [counter]='counter' />
      </div>`,

  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExampleChildValueComponent, ExampleChildButtonComponent]
})
export class ExampleParentComponent {
  counter = signal(0);
  counterDoubled = computed(() => this.counter() * 2);
}
