import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  group = ['ball', 'virtual', 'fun'];
  constructor(private http: HttpClient) { }

  /**
   * Get the games list
   * @returns Observable
   */
  get_games(){
    return this.http.get('http://stage.whgstage.com/front-end-test/games.php');
  }

  /**
   * Get the jackpot's list
   * @returns Observer
   */
  get_jackpots(){
    return this.http.get('http://stage.whgstage.com/front-end-test/jackpots.php');
  }

  /**
   * Categories list
   * @returns Promisse
   */
  get_categories(){
    return new Promise((resolve, rejects) => {
      this.get_games().subscribe( (data: any) => {
        try {
          const categories = [];
          let countId = 2;
          for (const rowGame of data) {
            for (const rowCategory of rowGame.categories) {
              let description = rowCategory;
              if (rowCategory === 'top' || rowCategory === 'new'){
                description += ' Games';
              }

              if (this.group.find(x => x === description)){
                description = 'Other';
              }

              const category = categories.find(x =>  x.description === description );
              if (!category){
                categories.push({
                  id: rowCategory === 'top' ? 0 : rowCategory === 'new' ? 1 : countId,
                  description,
                  link: 'dashboard?game=' + ( description === 'Other' ? 'other' : rowCategory )
                });
                if ( !(rowCategory === 'top' || rowCategory === 'new') ){
                  countId++;
                }
              }
            }
          }
          resolve(categories.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
        } catch (error) {
          rejects(error);
        }
      });
    });
  }
}
