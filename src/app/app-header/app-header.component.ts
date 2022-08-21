import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedsService } from '../services/feeds.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
  categories: Array<string>;
  actualRote: string;
  constructor(private feeds: FeedsService,
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((routeData: any) => {
      this.actualRote = routeData.game;
      this.feeds.get_categories().then((data: any) => {
        for (const row of data) {
          row.description = this.capitalize(row.description);
          row.active = row.description.toLowerCase().includes(this.actualRote);
        }
        this.categories = data;
      });
    });
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
