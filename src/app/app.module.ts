import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './movies/movies.component';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ActorsComponent } from './actors/actors.component';
import {MenubarModule} from 'primeng/menubar';
import { MenuItem, MegaMenuItem } from 'primeng/api';
import { TvShowComponent } from './tv-show/tv-show.component';
import { HeaderComponent } from './header/headerComp/header.component';
import { SharedModule } from './core/shared/shared.module';
import { FooterComponent } from './footer/footer/footer.component';
import { TrandingComponent } from './home/tranding/tranding.component';
import {PaginatorModule} from 'primeng/paginator';
import { SearchBarComponent } from './core/shared/search-bar/search-bar.component';
import {OrderModule} from 'ngx-order-pipe';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SearchBarComponent,
    MoviesComponent,
    ActorsComponent,
    TvShowComponent,
      FooterComponent,
      HeaderComponent,
      TrandingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MenubarModule,
    RouterModule,
    AppRoutingModule,
    VirtualScrollerModule,
    ReactiveFormsModule,
    SharedModule,
    PaginatorModule,
    OrderModule,
    DropdownModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
