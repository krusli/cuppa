import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GroupsEffects } from './groups.effects';

describe('GroupsEffects', () => {
  let actions$: Observable<any>;
  let effects: GroupsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GroupsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(GroupsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
