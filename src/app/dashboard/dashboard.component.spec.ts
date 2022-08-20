import { DashboardComponent } from './dashboard.component';

const mockRoute = {
  queryParams: ()=>{}
}
const mockFeeds = {
  get_games: ()=>{},
  get_jackpots: ()=>{}
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  beforeEach(() => {
    component = new DashboardComponent(mockRoute as any, mockFeeds as any);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
