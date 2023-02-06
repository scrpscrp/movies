import { Pipe } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { CardDetailsComponent } from './card-details/card-details.component';
import { BackgroundDirective } from './directive/background.directive';
import {RatingModule} from 'primeng/rating';
import { MovieCardComponent } from 'src/app/movies/cards/card-component';
import {KnobModule} from 'primeng/knob';
import { ToggleDirective } from './directive/toggle.directive';
import { MinutesPipe } from './pipes/minutes.pipe';
import {CarouselModule} from 'primeng/carousel';
import { SliderComponent } from './slider/slider.component';
import { ModalTrailerComponent } from './modal-trailer/modal-trailer.component';
import { SafeUrlPipe } from './pipes/safeUrl.pipe';
import { ActorsCardDetailsComponent } from './actors-card-details/actors-card-details.component';

import {PaginatorModule} from 'primeng/paginator';








@NgModule({
  declarations: [FilterComponent, CardDetailsComponent, BackgroundDirective, MovieCardComponent, ToggleDirective,MinutesPipe, SliderComponent, ModalTrailerComponent, SafeUrlPipe, ActorsCardDetailsComponent,],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    SliderModule,
    FormsModule,
    RatingModule,
    KnobModule,
    CarouselModule,
    PaginatorModule
  ],
  exports: [FilterComponent, ButtonModule, SliderModule, BackgroundDirective, MovieCardComponent, MinutesPipe,CarouselModule, SafeUrlPipe],
})
export class SharedModule {}
