import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleboxCodeComponent } from './examplebox-code.component';

describe('ExampleboxCodeComponent', () => {
  let component: ExampleboxCodeComponent;
  let fixture: ComponentFixture<ExampleboxCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleboxCodeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleboxCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
