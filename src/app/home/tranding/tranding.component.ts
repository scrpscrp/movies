import { take } from 'rxjs';
import { trandingDataInterface } from './../../Interface/tranding.data.interface';
import { trandingInterface } from './../../Interface/tranding.interface';
import { trailerInterface } from './../../Interface/trailer.interface';
import { TvShow } from './../../Interface/tvshow.interface';
import { Component, OnInit } from '@angular/core';
import { trandingService } from 'src/app/services/tranding.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-tranding',
  templateUrl: './tranding.component.html',
  styleUrls: ['./tranding.component.scss']
})
export class TrandingComponent implements OnInit {

  trandings: trandingInterface[] = [];
  currentPage: number  ;

  constructor(
    private trandingservice: trandingService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    this.getTranding();
  }

  getTranding() {
    if ( !this.currentPage) {
      this.currentPage = 1;
    }
    this.trandingservice.todayTranding(this.currentPage).pipe(take(1)).subscribe((data: trandingDataInterface) => {
    this.trandings = data.results;
    })
  }

  paginate(event) {
    this.currentPage = event.page +1;
    this.getTranding();
  }
  
  navigateToDetails(type: string, contentId: number) {
    if (type === 'tv') {
      this.router.navigate(['tv_show_details'], {queryParams: {tvShowDetails: contentId}});
    } else if ( type === 'movie') {
      this.router.navigate(['/movie_details'], {queryParams: {movieDetails: contentId}});
    }
  }

}