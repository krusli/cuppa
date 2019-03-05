import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMeetupsComponent } from './group-meetups.component';

describe('GroupMeetupsComponent', () => {
  let component: GroupMeetupsComponent;
  let fixture: ComponentFixture<GroupMeetupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMeetupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
