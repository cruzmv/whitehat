import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  group = ['ball','virtual','fun'];
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
    return new Promise((resolve,rejects) =>{
      this.get_games().subscribe( (data: any) =>{
        try {
          const categories = [];
          let count_id = 2;
          for (let mI = 0; mI < data.length; mI++) {
            for (let cI = 0; cI < data[mI].categories.length; cI++) {
              let description = data[mI].categories[cI];
              if(data[mI].categories[cI] === 'top' || data[mI].categories[cI] === 'new')
                description += ' Games';

              if(this.group.find(x => x === description))
                description = 'Other';

              const category = categories.find(x =>  x.description === description );
              if (!category){
                categories.push({
                  id: data[mI].categories[cI] === 'top' ? 0 : data[mI].categories[cI] === 'new' ? 1 : count_id,
                  description: description,
                  link: 'dashboard?game='+( description === 'Other'? 'other' : data[mI].categories[cI] )
                });
                if( !(data[mI].categories[cI] === 'top' || data[mI].categories[cI] === 'new') )
                  count_id++;
              }
            }
          }
          resolve(categories.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
        } catch (error) {
          rejects(error);
        }
      })
    })
  }
}
