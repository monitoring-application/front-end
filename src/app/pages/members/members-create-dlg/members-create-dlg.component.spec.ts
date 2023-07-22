import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersCreateDlgComponent } from './members-create-dlg.component';

describe('MembersCreateDlgComponent', () => {
  let component: MembersCreateDlgComponent;
  let fixture: ComponentFixture<MembersCreateDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersCreateDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersCreateDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
