import { FeedsService } from './feeds.service';

const mockHttp = {
  get: ()=>{}
}

describe('FeedsService', () => {
  let service: FeedsService;

  beforeEach(() => {
    service = new FeedsService(mockHttp as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
