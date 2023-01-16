import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInCompComponent } from './sign-in-comp/sign-in-comp.component';



@NgModule({
  declarations: [
    SignInCompComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [SignInCompComponent]
})
export class CreateAccountModule { }
