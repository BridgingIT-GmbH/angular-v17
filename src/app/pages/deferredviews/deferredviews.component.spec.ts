import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeferredviewsComponent } from './deferredviews.component';

describe('DeferredviewsComponent', () => {
  let component: DeferredviewsComponent;
  let fixture: ComponentFixture<DeferredviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferredviewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeferredviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
