import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MeetupsEffects } from './meetups.effects';

describe('MeetupsEffects', () => {
  let actions$: Observable<any>;
  let effects: MeetupsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MeetupsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(MeetupsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
