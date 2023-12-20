import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ExampleboxCodeComponent,
  ExampleboxComponent,
  ExampleboxDescriptionComponent,
  ExampleboxPreviewComponent
} from '../../shared';
import { ActivatedRoute } from '@angular/router';
import { ExampleParentComponent } from './example/example-parent.component';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [
    CommonModule,
    ExampleboxComponent,
    ExampleboxPreviewComponent,
    ExampleboxCodeComponent,
    ExampleboxDescriptionComponent,
    ExampleParentComponent
  ],
  template: `
      <app-examplebox title="">
          <app-examplebox-description ngPreserveWhitespaces>
## Feature in v16

Signals sind eine neue Art, wie wir innerhalb von Angular reaktiv entwickeln. 
              
Dabei werden Werte im Code nicht direkt genutzt, sondern es wird mit einem Container gearbeitet.
\`\`\`typescript
{{code}}
\`\`\`

### ChangeDetection
Ändert sich der Wert einer Referenz, dann wird der Wert an jeder Stelle, an der auf das \`Signal\` zugegriffen wird, angepasst.
Es wird dabei nicht die Funktionalität der standard Change Detection genutzt sondern die \`OnPush\` Strategie. 
Dabei wird bei einer Änderung **nicht die komplette Komponente neu gerendert, sondern nur die Stellen**, die sich auf das Signal beziehen. 

### Komponentenübergreifend
Das hat den Vorteil, dass wir auch **über Komponentengrenzen** hinweg die \`gleichen Wertreferenzen\` nutzen können.
              

Im Beispiel bindet die \`ParentComponent\` die beiden Komponenten \`ChildButtonComponent\` und \`ChildValueComponent\` ein.
Beide erhalten als **Input Property** das Signal \`counter\` (Vgl. Source Code: 1,2).
              
Wird nun der Button der \`ChildButtonComponent\` geklickt, wird die \`ChildValueComponent\` trotz **OnPush Strategie** aktualisiert.
              
### Computed Signals
              
Computed Signals sind ebenfalls sehr praktisch, denn sie werden aktualisiert, sobald die Signals - die von einem Computed Signal genutzt werden - geupdated werden.
              
Beispielcode:
\`\`\`typescript 
  const sourceSignal = signal(40);
  const addSignal = signal(2);
  const computedSignal = computed(() => sourceSignal() + addSignal());
\`\`\`
              
Hierbei wird die Funktion \`computed\` genutzt um ein neues Signal auf Basis von \`sourceSignal\` und \`addSignal\` zu erstellen. 
Wird eines der beiden Signals geupdated, erhält \`computedSignal\` ebenfalls einen neuen Wert.

Im Beispiel der \`ParentComponent\` wird das **Computed Signal** genutzt um den Wert von \`counter\` genutzt um diesen mit 2 zu multiplizieren (Vgl. Source Code: 3).
              
### Signal Effects
          
\`effect\` ist eine saubere möglichkeit auf eine Werte Änderung eines Signals zu reagieren. 
Sobald sich der Wert eines im Effekt genutzten Signals ändert, wird der \`Side Effect\` ausgeführt (Vgl. Source Code: 4).

\`\`\`typescript
const sourceSignal = signal(40);
const signalEffect = effect(() => console.log("New value: ", sourceSignal()));
\`\`\` 
              
**!Achtung!** : Ein \`effect\` muss immer in einem Injectioncontext ausgeführt werden. Dies sind:
* **Klassen Konstruktoren**, 
* **Default Values von Klassenvariablen**
* **Provider Factories**
* **runInInjectionContext-Wrapper**

Beispiel für \`runInInjectionContext\`:
\`\`\`typescript
injector = inject(Injector);
sourceSignal = signal(40);

ngOnInit(): void {{"{"}}
  &nbsp;&nbsp;runInInjectionContext(this.injector, () => {{"{"}}
  &nbsp;&nbsp;&nbsp;&nbsp;effect(() => console.log('New value :', this.sourceSignal()));
  &nbsp;&nbsp;{{"}"}});
{{"}"}}
\`\`\`
          </app-examplebox-description>
          <app-examplebox-code ngPreserveWhitespaces>
{{codeParent}}

{{codeChildButton}}
              
{{codeChildValue}}
          </app-examplebox-code>
          <app-examplebox-preview>
              <app-signal-example-parent/>
          </app-examplebox-preview>
      </app-examplebox>
  `,
  styles: ``
})
export class SignalsComponent {
  activatedRoute = inject(ActivatedRoute);

  code = "@Component(" +
    "{\n  selector: 'app-cmp',\n" +
    "  standalone: true,\n" +
    "  template: `<button> {{ counter() }}</button>`,\n" +
    "  styles: '',\n" +
    "  changeDetection: ChangeDetectionStrategy.OnPush,\n" +
    "})\n" +
    "export class NavbarComponent {\n" +
    "  counter = signal(0);\n" +
    "}"

  codeParent = "//example-parent.component.ts\n" +
    "@Component(" +
    "{\n  selector: 'app-parent',\n" +
    "  standalone: true,\n" +
    "  template: `\n    <app-child-value [counter]='counter' [counterDoubled]='counterDoubled'/>  // (1)\n    <app-child-button [counter]='counter'/>                                   // (2)\n  `,\n" +
    "  styles: '',\n" +
    "  changeDetection: ChangeDetectionStrategy.OnPush,\n" +
    "  imports: [ChildValueComponent, ChildButtonComponent]\n" +
    "})\n" +
    "export class ParentComponent {\n" +
    "  counter = signal(0);\n" +
    "  counterDoubled = computed(() => this.counter() * 2);                        // (3)\n" +
    "}"
  codeChildButton = "//example-child-button.component.ts\n" +
    "@Component(" +
    "{\n  selector: 'app-child-button',\n" +
    "  standalone: true,\n" +
    "  template: `<button (click)='counter.set(counter() +1)'>Increment</button>`,\n" +
    "  styles: '',\n" +
    "  changeDetection: ChangeDetectionStrategy.OnPush,\n" +
    "})\n" +
    "export class ChildButtonComponent {\n" +
    "  @Input()\n" +
    "  counter!: WritableSignal<number>;\n" +
    "}"
  codeChildValue = "//example-child-value.component.ts\n" +
    "@Component(" +
    "{\n  selector: 'app-child-value',\n" +
    "  standalone: true,\n" +
    "  template: `\n    <div>Current Count: {{ counter() }}</div>\n    <div>Doubled Count: {{ counterDoubled() }}</div>\n  `,\n" +
    "  styles: '',\n" +
    "  changeDetection: ChangeDetectionStrategy.OnPush,\n" +
    "})\n" +
    "export class ChildValueComponent {\n" +
    "  @Input()\n" +
    "  counter!: Signal<number>;\n" +
    "  @Input()\n" +
    "  counterDoubled!: Signal<number>;\n\n" +
    "  effectCounter = effect(() => console.log(\"value: \", this.counter()));       // (4)\n" +
    "}"
}
