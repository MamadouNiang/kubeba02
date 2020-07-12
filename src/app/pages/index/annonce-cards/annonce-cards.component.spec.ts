import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceCardsComponent } from './annonce-cards.component';

describe('AnnonceCardsComponent', () => {
  let component: AnnonceCardsComponent;
  let fixture: ComponentFixture<AnnonceCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnonceCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
