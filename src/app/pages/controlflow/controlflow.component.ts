import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleboxComponent, ExampleboxDescriptionComponent } from '../../shared';

@Component({
  selector: 'app-controlflow',
  standalone: true,
  imports: [CommonModule, ExampleboxComponent, ExampleboxDescriptionComponent],
  template: `
      <app-examplebox>
          <app-examplebox-description ngPreserveWhitespaces>

## Feature in Angular v17
Seit beginn der v2 von Angular existieren **Control Flow** Direktiven im Angular um im Template konditional Bereiche zu rendern und über Listen zu iterieren.
Die Rede ist von \`*ngIf\`, \`ngSwitch\` oder \`*ngFor\`. Diese Direktiven sind Teil des \`CommonModule\`, 
können allerdings auch im Zuge des Umbaus auf **Standalone Components** direkt importiert werden.
<br>
### Beispiel für den Alten Control Flow:
              
\`\`\`typescript
// app.component.ts
&#64;Component({{ '{' }}
&nbsp;&nbsp;standalone: true,
&nbsp;&nbsp;selector: 'app-component',
&nbsp;&nbsp;imports: [ButtonComponent, /*CommonModule, */ NgIf],
&nbsp;&nbsp;template: '&lt;app-button *ngIf="visible"&gt;ButtonLabel&lt;/app-button&gt;',
{{ '}' }})
export class AppComponent() {{ '{' }}
  visible = true;          
{{ '}' }}
\`\`\`
              
Im Zuge von v17 wird **eine neue Syntax** für den **Control Flow** eingeführt. Diese Syntax ist Teil der 
**Template Engine in Angular Core** und muss nicht mehr in explizit importiert werden. Dabei wird jedes definierte 
Keyword des Control Flows mit einem \`&#64;\` geprefixt.
 
### If, else, elseif

In folgendem Beispiel wird gezeigt, wie der Control Flow über die standard Conditionals abgebildet werden:
              
\`\`\`html
&#64;if (visible === true) {{ '{' }}
&lt;h1&gt;Visible is true&lt;/h1&gt;
{{ '}' }}
&#64;else if (visible === false) {{ '{' }}
&lt;h1&gt;Visible is false&lt;/h1&gt;
{{ '}' }}
&#64;else {{ '{' }}
&lt;h1&gt;Visible is undefined or null&lt;/h1&gt;
{{ '}' }}
\`\`\`
              
### Switch-Case
Angular bietet auch die Möglichkeit, switch-case blöcke direkt im Template zu schreiben.
<div class="flex w-full gap-4">
    <div class="flex-1">
        
#### Direktiven version (vor v17):
        
\`\`\`html
&lt;ng-container [ngSwitch]="value"&gt;
    &lt;ng-container *ngSwitchCase="'green'"&gt;...&lt;/ng-container&gt;
    &lt;ng-container *ngSwitchCase="'red'"&gt;...&lt;/ng-container&gt;
    &lt;ng-container *ngSwitchDefault&gt;...&lt;/ng-container&gt;
&lt;/ng-container&gt;
\`\`\`

    </div>
    <div class="flex-1">
        
#### Neuer Control Flow (ab v17):

        \`\`\`html
&#64;switch (value) {{ '{' }}
&nbsp;&nbsp;&nbsp;&nbsp;&#64;case ('green') {{ '{' }}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[...]
&nbsp;&nbsp;&nbsp;&nbsp;{{ '}' }}
&nbsp;&nbsp;&nbsp;&nbsp;&#64;switch ('red') {{ '{' }}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[...]
&nbsp;&nbsp;&nbsp;&nbsp;{{ '}' }}
&nbsp;&nbsp;&nbsp;&nbsp;&#64;default {{ '{' }}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[...]
&nbsp;&nbsp;&nbsp;&nbsp;{{ '}' }}
{{ '}' }}
\`\`\`
        
    </div>
</div>
          </app-examplebox-description>
      </app-examplebox>
  `,
  styles: ``,
})
export class ControlflowComponent {}
