import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleboxComponent } from './examplebox.component';

describe('ExampleboxComponent', () => {
  let component: ExampleboxComponent;
  let fixture: ComponentFixture<ExampleboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
