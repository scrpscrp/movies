

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './headerComp/header.component';


import { LogInModule } from './log-in/log-in.module';
import { CreateAccountModule } from './create-account/create-account.module';

import { Routes,RouterModule} from '@angular/router';
import {MenubarModule} from 'primeng/menubar';
import { HeaderRoutingModule } from './header-routing.module';




@NgModule({
  declarations: [
    HeaderComponent,
  
  ],
  imports: [
    CommonModule,


    LogInModule,
    CreateAccountModule,

    MenubarModule,
    HeaderRoutingModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule { }
