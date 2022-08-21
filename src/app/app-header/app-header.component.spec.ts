import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppHeaderComponent } from './app-header.component';

const mockFeeds = {
  get_games: () => {},
  get_jackpots: () => {},
  get_categories: () => {}
};

const mockRoute = {
  queryParams: () => of({})
};

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;

  beforeEach(() => {
    component = new AppHeaderComponent(mockFeeds as any, mockRoute as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init successfully', fakeAsync( () => {
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
    const categoriesList = [
      {id: 0, description: 'top Games', link: 'dashboard?game=top'},
      {id: 1, description: 'new Games', link: 'dashboard?game=new'},
      {id: 2, description: 'slots', link: 'dashboard?game=slots'},
      {id: 3, description: 'classic', link: 'dashboard?game=classic'},
      {id: 4, description: 'poker', link: 'dashboard?game=poker'},
      {id: 5, description: 'roulette', link: 'dashboard?game=roulette'},
      {id: 6, description: 'blackjack', link: 'dashboard?game=blackjack'},
      {id: 7, description: 'Other', link: 'dashboard?game=other'}
    ];
    const expectedCategoriesList = [
      {id: 0, description: 'Top Games', link: 'dashboard?game=top', active : false},
      {id: 1, description: 'New Games', link: 'dashboard?game=new', active : false},
      {id: 2, description: 'Slots', link: 'dashboard?game=slots', active : false},
      {id: 3, description: 'Classic', link: 'dashboard?game=classic', active : false},
      {id: 4, description: 'Poker', link: 'dashboard?game=poker', active : true},
      {id: 5, description: 'Roulette', link: 'dashboard?game=roulette', active : false},
      {id: 6, description: 'Blackjack', link: 'dashboard?game=blackjack', active : false},
      {id: 7, description: 'Other', link: 'dashboard?game=other', active : false}
    ];

    // linting scape
    const route = 'route';
    component[route].queryParams = of({game: 'poker'});

    // linting scape
    const feeds = 'feeds';
    spyOn(component[feeds], 'get_games' as any).and.returnValue(of(gamesList));
    spyOn(component[feeds], 'get_categories' as any).and.returnValue( Promise.resolve(categoriesList) );

    component.ngOnInit();
    tick(3000);

    expect(component.actualRote).toEqual('poker');
    expect(component.categories).toEqual( expectedCategoriesList as any );
  }));

  it('should capitalize the text', () => {
    const result = component.capitalize('foo text');
    expect(result).toEqual('Foo text');
  });
});
