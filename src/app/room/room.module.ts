import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AlertModule } from './../alert/alert.module';
import { RoomService } from './services';
import { RoomComponent,RoomsListComponent, RoomDetailComponent } from './components';

@NgModule({
  declarations: [
  RoomComponent,
  RoomsListComponent,
  RoomDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AlertModule
  ],
  providers: [
    RoomService
  ]
})
export class RoomModule { }
