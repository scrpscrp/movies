import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInCompComponent } from './log-in-comp/log-in-comp.component';



@NgModule({
  declarations: [
    LogInCompComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [LogInCompComponent]
})
export class LogInModule { }
