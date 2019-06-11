import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupJumbotronComponent } from './meetup-jumbotron.component';

describe('MeetupJumbotronComponent', () => {
  let component: MeetupJumbotronComponent;
  let fixture: ComponentFixture<MeetupJumbotronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupJumbotronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupJumbotronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
