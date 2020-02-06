import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineFileComponent } from './define-file.component';

describe('DefineFileComponent', () => {
  let component: DefineFileComponent;
  let fixture: ComponentFixture<DefineFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
