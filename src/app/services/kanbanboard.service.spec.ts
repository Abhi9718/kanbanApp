import { TestBed } from '@angular/core/testing';

import { KanbanboardService } from './kanbanboard.service';

describe('KanbanboardService', () => {
  let service: KanbanboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KanbanboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
