import { tvTrailerInterface } from './../../../Interface/tv.trailer.interface';
import { tvTrailerData } from './../../../Interface/tv.trailer.data.interface';
import { TvShowService } from 'src/app/services/tv-show.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { trailerDataInterface } from 'src/app/Interface/trailer.data.interface';
import { trailerInterface } from 'src/app/Interface/trailer.interface';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-modal-trailer',
  templateUrl: './modal-trailer.component.html',
  styleUrls: ['./modal-trailer.component.scss']
})
export class ModalTrailerComponent implements OnInit {
  @Input() trailerId: string;
  @Output() close = new EventEmitter<void>();

  trailer: trailerInterface[] = [];
  tvTrailer: tvTrailerInterface[] = [];
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

  getMovieTrailer() {
    this.movieService.getMovieTrailer(this.trailerId).pipe(take(1)).subscribe((data: trailerDataInterface) => {
      this.trailer = data.results;
      const officialTrailer = this.trailer.find(item => item.official || item.type === 'Trailer')
      this.trailerKey$.next(officialTrailer.key);
      if (!officialTrailer){
        this.noVideo$.next(true);
      }
    });
  }
  getTvTrailer() {
    this.tvShowService.getTvTrailer(this.trailerId).pipe(take(1)).subscribe((data: tvTrailerData) => {
      this.tvTrailer = data.results;
      if (this.tvTrailer.length > 0) {
        const officialTrailer = this.tvTrailer.find(item => item.official || item.type === 'Trailer')
        this.trailerKey$.next(officialTrailer.key);
    } else this.noVideo$.next(true);
    });
  }
  

  checkRoute() {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params)=> {
      if (params['movieDetails']) {
        this.getMovieTrailer();
      } else if (params['tvShowDetails']) {
        this.getTvTrailer();
      }
    })
  }

}
