import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLargeComponent } from './group-large.component';

describe('GroupLargeComponent', () => {
  let component: GroupLargeComponent;
  let fixture: ComponentFixture<GroupLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
