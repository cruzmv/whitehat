import { AppHeaderComponent } from './app-header.component';

const mockFeeds = {
  get_games: ()=>{},
  get_jackpots: ()=>{}
}

const mockRoute = {
  queryParams: ()=>{}
}

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;

  beforeEach(() => {
    component = new AppHeaderComponent(mockFeeds as any, mockRoute as any);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
