
import { ActorsCardDetailsComponent } from './core/shared/components/actors-card-details/actors-card-details.component';
import { TvShowComponent } from './tv-show/tv-show.component';
import { ActorsComponent } from './actors/actors.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { CardDetailsComponent } from './core/shared/components/card-details/card-details.component';
import { SearcResultComponent } from './searc-result/searc-result.component';



const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'search-results', component: SearcResultComponent,
  },
  {
    path: 'tv-show', component:TvShowComponent,
  },
  {
    path: 'tv_show_details', component: CardDetailsComponent,
  },
  {
    path: 'movies', component:MoviesComponent,
  },
  {
    path:'actors', component: ActorsComponent,
  },
  {
    path: 'actors_details', component: CardDetailsComponent,
  },
  {
    path:'movie_details', component: CardDetailsComponent, 
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
