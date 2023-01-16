import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { MainSearchModule } from './main-search/main-search.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './movies/movies.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ActorsComponent } from './actors/actors.component';
import { MovieCardComponent } from './movies/cards/card-component';
import { TvShowComponent } from './tv-show/tv-show.component';
import {ButtonModule} from 'primeng/button';
import { SharedModule } from './core/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,

    MoviesComponent,

    ActorsComponent,
    MovieCardComponent,
    TvShowComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HeaderModule,
    MainSearchModule,
    RouterModule,
    AppRoutingModule,
    VirtualScrollerModule,
    ReactiveFormsModule,
    ButtonModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
