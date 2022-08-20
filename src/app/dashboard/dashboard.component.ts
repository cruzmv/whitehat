import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedsService } from '../services/feeds.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  games = [];
  interval: any;
  group = ['ball','virtual','fun'];

  constructor(private route: ActivatedRoute,
              private feeds: FeedsService ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((data:any) => {
      this.filter_games(data.game);
    })

    this.interval = setInterval(()=>{
      this.get_jackpot();
    },3000)

  }

  /**
   * Filter the game list
   * @param filter: the filter for the game list
   */
  filter_games(filter: string){
    this.feeds.get_games().subscribe( (data:any) =>{
      if(filter === 'other'){
        for (let mI = 0; mI < this.group.length; mI++) {
          const games = data.filter(x => x.categories.find( y => y === this.group[mI] ) );
          this.games = this.games.concat(games);
        }
      } else {
        this.games = data.filter(x => x.categories.find( y => y === filter ) );
      }
      this.games.forEach(element => {
        if(element.categories.find(x => x === 'top'))
          element.top = 'top';

        if(element.categories.find(x => x === 'new'))
          element.new = 'new';
      });
      this.get_jackpot();
    })
  }

  /**
   * Apply the jackpot's to the games
   */
  get_jackpot(){
    this.feeds.get_jackpots().subscribe((data:any) =>{
      for (let mI = 0; mI < data.length; mI++) {
        const game = this.games.find(x => x.id === data[mI].game);
        if(game)
          game.jackpot = data[mI].amount;
      }
    })
  }
}
