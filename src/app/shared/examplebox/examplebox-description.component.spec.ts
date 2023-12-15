import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleboxDescriptionComponent } from './examplebox-description.component';

describe('ExampleboxDescriptionComponent', () => {
  let component: ExampleboxDescriptionComponent;
  let fixture: ComponentFixture<ExampleboxDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleboxDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleboxDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
