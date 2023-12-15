import { ChangeDetectionStrategy, Component, effect, HostBinding, Input, Signal } from '@angular/core';

@Component({
  selector: 'app-signal-example-child-value',
  standalone: true,
  template: `
      <div>Current Count: {{ counter() }}</div>
      <div>Doubled Count: {{ counterDoubled() }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleChildValueComponent {
  @Input()
  counter!: Signal<number>;

  @Input()
  counterDoubled!: Signal<number>;

  effectCounter = effect(() => console.log("Counter value: ", this.counter()));
  @HostBinding('class')
  get class() {
    return 'inline-flex flex-col';
  }
}
