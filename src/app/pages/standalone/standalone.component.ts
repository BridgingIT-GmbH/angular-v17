import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleboxComponent, ExampleboxDescriptionComponent } from '../../shared';

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [CommonModule, ExampleboxComponent, ExampleboxDescriptionComponent],
  template: `
      <app-examplebox>
          <app-examplebox-description ngPreserveWhitespaces>
## Feature in v15

**Standalone Components** vereinfachen die Architektur von Angular Anwendungen erheblich, denn die
\`NgModules\`
werden nicht mehr benötigt.

Bislang wurden die Module als **Bindeglied** zwischen Komponenten und deren Abhängigkeiten genutzt. Alle
Komponenten
wurden in einem Modul deklariert und konnten so im gleichen Kontext genutzt werden.

**Modulbeispiel:**
\`\`\`typescript
// app.module.ts
&#64;NgModule({{ '{' }}
&nbsp;&nbsp;declarations: [AppComponent, ButtonComponent],
&nbsp;&nbsp;imports: [SharedModule]
{{ '}' }})
export class AppModule() {{ '{' }}{{ '}' }}

// app.component.ts
&#64;Component({{ '{' }}
&nbsp;&nbsp;selector: 'app-component'
&nbsp;&nbsp;template: '&lt;app-button&gt;ButtonLabel&lt;/app-button&gt;',
{{ '}' }})        
export class AppComponent() {{ '{' }}{{ '}' }}

// button.component.ts
&#64;Component({{ '{' }}
&nbsp;&nbsp;selector: 'app-button'
&nbsp;&nbsp;template: '&lt;button&gt;&lt;ng-content/&gt;&lt;/button&gt;',
{{ '}' }})
export class AppButton() {{ '{' }}{{ '}' }}
\`\`\`
              
Dies ist seit **Angular v15** nicht mehr nötig. Abhängigkeiten von Komponenten werden in einer \`Standalone Component\` 
direkt in der Komponentendefinition festgelegt. Das vereinfacht das Entwickeln – und der Bundler kann nicht benötigte 
Komponenten direkt über **Treeshaking** entfernen.


\`\`\`typescript
// app.component.ts
&#64;Component({{ '{' }}
&nbsp;&nbsp;standalone: true,
&nbsp;&nbsp;selector: 'app-component',
&nbsp;&nbsp;imports: [ButtonComponent],
&nbsp;&nbsp;template: '&lt;app-button&gt;ButtonLabel&lt;/app-button&gt;',
{{ '}' }})
export class AppComponent() {{ '{' }}{{ '}' }}

// button.component.ts
&#64;Component({{ '{' }}
&nbsp;&nbsp;standalone: true,
&nbsp;&nbsp;selector: 'app-button'
&nbsp;&nbsp;template: '&lt;button&gt;&lt;ng-content/&gt;&lt;/button&gt;',
{{ '}' }})
export class AppButton() {{ '{' }}{{ '}' }}
\`\`\`
   
<br>
              
## Bootstrapping einer Standalone Component Applikation
In der \`main.ts\` wird die Anwendung gebootstrappt. Dies war mit den Modulen so und ist es als Standalone Component Applikation.
              
Statt der Funktion \`bootstrapModule()\`, in der das Root Modul definiert wurde wird nun die Funktion \`bootstrapApplication()\` genutzt.
Als Argument wird hier die Initiale Komponente der Anwendung angegeben.

\`\`\`typescript
// main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) =>
console.error(err)
);
\`\`\`
  
              
<br>
              
## Modularisierung
Durch das Wegfallen der \`NgModule\` wird die Modularisierung von Angular genommen. 
Typescript hilft hier und bietet die Möglichkeit sogenannte **Barrel**-Files anzulegen. Das sind Dateien, die die externen
interfaces bestimmen.
    
**Beispiel Barrel File (index.ts):**
\`\`\`typescript
// index.ts
export * from './button.component.ts';
export {{ '{' }} ValueComponent {{ '}' }} from './value.component.ts';
\`\`\`
              
**Tip: Die Exports in den Barrel Dateien sollten so Explizit wie möglich definiert werden.**
              
## Interoperabilität mit \`NgModules\`
Standalone Components können sowohl in andere Standalone Components importiert werden als auch direkt in Module. Dadurch 
ist der Einsatz auch in bereits bestehenden Angular Projekten ohne Probleme möglich.

\`\`\`typescript
// app.module.ts
&#64;NgModule({{ '{' }}
&nbsp;&nbsp;declarations: [AppComponent],
&nbsp;&nbsp;imports: [SharedModule, ButtonComponent]
{{ '}' }})
export class AppModule() {{ '{' }}{{ '}' }}
 \`\`\`
              
Anders herum können **NgModules** auch in Standalone Components importiert werden. So können auch ältere Bibliotheken 
und Module mit der neuen Struktur genutzt werden.

\`\`\`typescript
// button.component.ts
&#64;Component({{ '{' }}
&nbsp;&nbsp;standalone: true,
&nbsp;&nbsp;selector: 'app-button'
&nbsp;&nbsp;imports: [SharedModule]
&nbsp;&nbsp;template: '&lt;button&gt;&lt;ng-content/&gt;&lt;/button&gt;',
{{ '}' }})
export class AppButton() {{ '{' }}{{ '}' }}
\`\`\`
              
<br>
              
## Einsatz von **Provider**
Generell können Provider und Services genutzt werden, die von Modulen Exportiert werden. Services, die innerhalb einer 
App erstellt wurden werden meist als Singleton im Root (\`providedIn: 'root'\`) initialisiert und sind im Scope der Anwendung verfügbar.
              
Für Standalone Components können auch Provider im Scope der Komponente und den Child Komponenten definiert werden.

\`\`\`typescript
// button.component.ts
&#64;Component({{ '{' }}
&nbsp;&nbsp;standalone: true,
&nbsp;&nbsp;selector: 'app-button'
&nbsp;&nbsp;providers: [ButtonActionService]
&nbsp;&nbsp;template: '&lt;button&gt;&lt;ng-content/&gt;&lt;/button&gt;',
{{ '}' }})
export class AppButton() {{ '{' }}
&nbsp;&nbsp;service = inject(ButtonActionService)
{{ '}' }}
\`\`\`
              
Im App Bootstrapping können ebenfalls Provider Definiert werden. Diese Provider sind anschließend anwendungsweit verfügbar.
Um Provider eines Moduls oder eine Library verfügbar zu machen, gibt es eine Hilfsfunktion: \`importProvidersFrom()\`. Damit werden alle Provider eines Modules oder einer Bibliothek in die Anwendung importiert.

\`\`\`typescript
// main.ts
bootstrapApplication(AppComponent, {{ '{' }}
&nbsp;&nbsp;providers: [
&nbsp;&nbsp;&nbsp;&nbsp;importProvidersFrom(HttpClientModule)
&nbsp;&nbsp;]
{{ '}' }}).catch((err) => console.error(err));
\`\`\`
              
<br>
              
## Routing im Context **Standalone Components**
Das Routing wird nun nicht mehr über das RouterModule konfiguriert und aktiviert, sondern es wird eine \`provide\`-Funktion zur Verfügung gestellt.
<br>**provideRouter(routes, ...features);** nimmt als ersten Parameter eine Liste von Routen entgegen. Die nachfolgenden Parameter können genutzt werden um den Router mit weiteren Features zu erweitern.

\`\`\`typescript
// main.ts
const routes: Routes = [];
bootstrapApplication(AppComponent, {{ '{' }}
&nbsp;&nbsp;providers: [
&nbsp;&nbsp;&nbsp;&nbsp;importProvidersFrom(HttpClientModule),
&nbsp;&nbsp;&nbsp;&nbsp;provideRouter(routes,
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withDebugTracing(),
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;withRouterConfig({{'{'}}paramsInheritanceStrategy: 'always'{{'}'}})
&nbsp;&nbsp;&nbsp;&nbsp;)
&nbsp;&nbsp;]
{{ '}' }}).catch((err) => console.error(err));
\`\`\`

<br>
              
## Provider auf Routen-Ebene

          </app-examplebox-description>
      </app-examplebox>`,
  styles: ``
})
export class StandaloneComponent {
}
