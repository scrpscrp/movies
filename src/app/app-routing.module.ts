import { TvShowComponent } from './tv-show/tv-show.component';
import { ActorsComponent } from './actors/actors.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';



const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'tv-show', component:TvShowComponent,
  },
  {
    path: 'movies', component:MoviesComponent,
  },
  {
    path:'actors', component: ActorsComponent,
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
