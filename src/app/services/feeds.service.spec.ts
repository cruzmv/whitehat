import { of } from 'rxjs';
import { FeedsService } from './feeds.service';

describe('FeedsService', () => {
  let service: FeedsService;
  const mockHttp = {};
  beforeEach(() => {
    service = new FeedsService(mockHttp as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('#get_games', () => {
  let service: FeedsService;
  const gamesList = [
    {
      categories: ['top', 'slot', 'new'],
      id: 'NETHEWISHMASTER',
      image: '//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
      name: 'The Wish Master'
    }
  ];
  const mockGamesHttp = {
    get: () => of(gamesList)
  };

  beforeEach(() => {
    service = new FeedsService(mockGamesHttp as any);
  });

  it('should get the games list', () => {
    const response = service.get_games();
    response.subscribe((data: any) => {
      expect(data).toEqual(gamesList);
    });
  });
});

describe('#get_jackpots', () => {
  let service: FeedsService;
  const JackPotList = [{game: 'NEJACKANDTHEBEANSTALK', amount: 91502}];
  const mockJackPotHttp = {
    get: () => of(JackPotList)
  };

  beforeEach(() => {
    service = new FeedsService(mockJackPotHttp as any);
  });

  it('should get the jackpot list', () => {
    const response = service.get_jackpots();
    response.subscribe((data: any) => {
      expect(data).toEqual(JackPotList);
    });
  });
});

describe('#get_categories', () => {
  let service: FeedsService;
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
    }, {
      categories: ['virtual'],
      id: 'NYXTOUCHDOWN',
      image: '//stage.whgstage.com/scontent/images/games/NYXTOUCHDOWN.jpg',
      name: 'Touchdown'
    }
  ];
  const mockGamesHttp = {
    get: () => of(gamesList)
  };

  beforeEach(() => {
    service = new FeedsService(mockGamesHttp as any);
  });

  it('should get the categorie list', () => {
    const result = service.get_categories();
    const expectedResult = [
      {id: 0, description: 'top Games', link: 'dashboard?game=top'},
      {id: 1, description: 'new Games', link: 'dashboard?game=new'},
      {id: 2, description: 'slot', link: 'dashboard?game=slot'},
      {id: 3, description: 'poker', link: 'dashboard?game=poker'},
      {id: 4, description: 'classic', link: 'dashboard?game=classic'},
      {id: 5, description: 'Other', link: 'dashboard?game=other'}
    ];
    result.then((data: any) => {
      expect(data).toEqual(expectedResult);
    });
  });
});
