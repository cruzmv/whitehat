import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedsService } from '../services/feeds.service'

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  categories: Array<string>;
  actual_rote: string;
  constructor(private feeds: FeedsService,
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((route_data:any) => {
      this.actual_rote = route_data.game;
      this.feeds.get_categories().then((data: any) => {
        for (let mI = 0; mI < data.length; mI++) {
          data[mI].description = this.capitalize(data[mI].description);
          data[mI].active = data[mI].description.toLowerCase().includes(this.actual_rote);
        }
        this.categories = data;
      })
    })
  }

  /**
   * Capitalize a text
   * @param text The texto to be capitalized
   * @returns <string> The text capilalized
   */
  capitalize(text: string){
    return text.charAt(0).toUpperCase() + text.slice(1);
  }


}
