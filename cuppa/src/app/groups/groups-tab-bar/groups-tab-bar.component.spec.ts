import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsTabBarComponent } from './groups-tab-bar.component';

describe('GroupsTabBarComponent', () => {
  let component: GroupsTabBarComponent;
  let fixture: ComponentFixture<GroupsTabBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsTabBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsTabBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
