import { ChangeDetectionStrategy, Component, Input, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-signal-example-child-button',
  standalone: true,
  template: `<button class="bg-blue-400 p-2 shadow-md shadow-black/20 rounded" (click)='counter.set(counter() +1)'>Increment</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleChildButtonComponent {
  @Input()
  counter!: WritableSignal<number>;

  get class() {
    return "inline-flex";
  }
}
