import { MatIconModule } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardButtonComponent } from './card-button.component';

describe('CardButtonComponent', () => {
  let component: CardButtonComponent;
  let fixture: ComponentFixture<CardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardButtonComponent],
      imports: [MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
