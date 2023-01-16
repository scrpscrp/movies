import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSearchCompComponent } from './main-search-comp/main-search-comp.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [
    MainSearchCompComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
  ],
  exports: [MainSearchCompComponent],
})
export class MainSearchModule { }
