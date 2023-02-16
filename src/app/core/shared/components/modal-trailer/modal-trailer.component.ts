import { TvTrailerInterface } from '../../../shared/Interface/tv.trailer.interface';
import { TvTrailerData } from '../../../shared/Interface/tv.trailer.data.interface';
import { TvShowService } from 'src/app/tv-show/tv-show.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoviesService } from 'src/app/movies/movies.service';
import { TrailerDataInterface } from 'src/app/core/shared/Interface/trailer.data.interface';;
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-modal-trailer',
  templateUrl: './modal-trailer.component.html',
  styleUrls: ['./modal-trailer.component.scss']
})
export class ModalTrailerComponent implements OnInit {
  @Input() trailerId: string;
  @Output() close = new EventEmitter<void>();

  trailerKey$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  noVideo$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private movieService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private tvShowService: TvShowService
  ) {}

  ngOnInit(): void {
    this.checkRoute();
  }

  checkRoute() {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params)=> {
      if (params['movieDetails']) {
        this.movieService.getMovieTrailer(this.trailerId).pipe(untilDestroyed(this)).subscribe((data: TrailerDataInterface) => {this.getTrailer(data);});
      } else this.tvShowService.getTvTrailer(this.trailerId).pipe(untilDestroyed(this)).subscribe((data: TvTrailerData) => {this.getTrailer(data)});
      })
    }

    getTrailer(data) {
    if(data.results.length > 0) {
      const officialTrailer = data.results.find(item => item.official || item.type === 'Trailer' || item.site === "YouTube")
      console.log(officialTrailer);
      this.trailerKey$.next(officialTrailer.key);
      } else this.noVideo$.next(true);
    }

}
