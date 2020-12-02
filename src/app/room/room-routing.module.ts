import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {
  RoomComponent,
  RoomsListComponent,
  RoomDetailComponent
} from './components';

export const roomsRoutes: Routes = [

  {
    path: 'rooms', component: RoomComponent,
    children: [
      {
        path: '',
        component: RoomsListComponent
      },
      {
        path: 'list',
        component: RoomsListComponent
      },
      {
        path: 'add',
        component: RoomDetailComponent
      },
      {
        path: 'update/:id',
        component: RoomDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(roomsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoomRoutingModule { }
