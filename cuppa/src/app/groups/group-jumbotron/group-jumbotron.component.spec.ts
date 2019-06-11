import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupJumbotronComponent } from './group-jumbotron.component';

describe('GroupJumbotronComponent', () => {
  let component: GroupJumbotronComponent;
  let fixture: ComponentFixture<GroupJumbotronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupJumbotronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupJumbotronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
