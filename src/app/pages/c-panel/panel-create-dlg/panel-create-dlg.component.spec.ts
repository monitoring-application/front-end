import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCreateDlgComponent } from './panel-create-dlg.component';

describe('PanelCreateDlgComponent', () => {
  let component: PanelCreateDlgComponent;
  let fixture: ComponentFixture<PanelCreateDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelCreateDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelCreateDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
