import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [FilterComponent, ContentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    SliderModule,
    FormsModule,
  ],
  exports: [FilterComponent, ButtonModule, SliderModule],
})
export class SharedModule {}
