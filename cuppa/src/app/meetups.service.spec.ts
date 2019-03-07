import { TestBed } from '@angular/core/testing';

import { MeetupsService } from './meetups.service';

describe('MeetupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeetupsService = TestBed.get(MeetupsService);
    expect(service).toBeTruthy();
  });
});
