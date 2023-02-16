import { take } from 'rxjs';
import { TrandingDataInterface } from '../../core/shared/Interface/tranding.data.interface';
import { TrandingInterface } from '../../core/shared/Interface/tranding.interface';
import { Component, OnInit } from '@angular/core';
import { trandingService } from 'src/app/home/tranding/tranding.service';
import { NavigateService } from 'src/app/core/shared/services/navigate.service';

@Component({
  selector: 'app-tranding',
  templateUrl: './tranding.component.html',
  styleUrls: ['./tranding.component.scss']
})
export class TrandingComponent implements OnInit {

  trandings: TrandingInterface[] = [];
  currentPage: number  ;

  constructor(private trandingservice: trandingService,private navigate: NavigateService) { }

  ngOnInit(): void {
    this.getTranding();
  }

  getTranding() {
    if ( !this.currentPage) {
      this.currentPage = 1;
    }
    this.trandingservice.todayTranding(this.currentPage).pipe(take(1)).subscribe((data: TrandingDataInterface) => {
    this.trandings = data.results;
    })
  }

  paginate(event) {
    this.currentPage = event.page +1;
    this.getTranding();
  }

  navigateToDetails(type: string, contentId: number) {
    type === 'tv' ? this.navigate.navigateToTvShowDetails(contentId):this.navigate.navigateToMovieDetails(contentId);
   }
}
