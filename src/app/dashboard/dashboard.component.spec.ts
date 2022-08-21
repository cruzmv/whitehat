import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';

const mockRoute = {
  queryParams: () => {}
};
const mockFeeds = {
  get_games: () => {},
  get_jackpots: () => {}
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  beforeEach(() => {
    component = new DashboardComponent(mockRoute as any, mockFeeds as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter the games', fakeAsync( () => {
    const gamesList = [
      {
        categories: ['top', 'slot', 'new'],
        id: 'NETHEWISHMASTER',
        image: '//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
        name: 'The Wish Master'
      },
      {
        categories:  ['poker', 'top'],
        id: 'BSDEUCESORJOKERS',
        image: '//stage.whgstage.com/scontent/images/games/BSDEUCESORJOKERS.jpg',
        name: 'Deuces And Jokers'
      },
      {
        categories: ['classic', 'new'],
        id: 'BSDRAWHILOW',
        image: '//stage.whgstage.com/scontent/images/games/BSDRAWHILOW.jpg',
        name: 'Draw Hi Low'
      },
      {
        categories: ['virtual'],
        id: 'NYXTOUCHDOWN',
        image: '//stage.whgstage.com/scontent/images/games/NYXTOUCHDOWN.jpg',
        name: 'Touchdown'
      }
    ];
    const jackPotList = [{game: 'NEJACKANDTHEBEANSTALK', amount: 91502}];
    const expectedResult = [
      {
        categories: ['top', 'slot', 'new'],
        id: 'NETHEWISHMASTER',
        image: '//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
        name: 'The Wish Master',
        top: 'top',
        new: 'new'},
      {
        categories: ['classic', 'new'],
        id: 'BSDRAWHILOW',
        image: '//stage.whgstage.com/scontent/images/games/BSDRAWHILOW.jpg',
        name: 'Draw Hi Low',
        new: 'new'}
    ];

    // lint scape
    const feeds = 'feeds';
    spyOn(component[feeds], 'get_games' as any).and.returnValue(of(gamesList));
    spyOn(component[feeds], 'get_jackpots' as any).and.returnValue(of(jackPotList));

    component.filter_games('new');
    tick(3000);

    expect(component.games).toEqual(expectedResult);
  }));

});
