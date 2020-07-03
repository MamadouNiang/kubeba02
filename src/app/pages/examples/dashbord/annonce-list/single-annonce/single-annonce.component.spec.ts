import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAnnonceComponent } from './single-annonce.component';

describe('SingleAnnonceComponent', () => {
  let component: SingleAnnonceComponent;
  let fixture: ComponentFixture<SingleAnnonceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAnnonceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
