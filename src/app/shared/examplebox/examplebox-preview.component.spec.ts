import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleboxPreviewComponent } from './examplebox-preview.component';

describe('ExampleboxPreviewComponent', () => {
  let component: ExampleboxPreviewComponent;
  let fixture: ComponentFixture<ExampleboxPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleboxPreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleboxPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
