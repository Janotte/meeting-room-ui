import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AlertService } from './../../../alert';
import { Room } from './../../models';
import { RoomService } from './../../services';


@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  rooms: Observable<Room[]>;

  constructor(
    public alertService: AlertService,
    private roomService: RoomService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.getRoomData();
    this.title.setTitle('Salas');
  }

  getRoomData() {
    this.rooms = this.roomService.findAll();
  }

  deleteRoom(id: number) {
    this.roomService.delete(id).pipe(
      tap(_ => {
        this.alertService.success('Sala excluída com sucesso!', { autoClose: true});
        this.getRoomData();
      })).subscribe();
  }

  updateRoom(id: number) {
    this.router.navigate(['rooms/update', id])
  }

  navigateToRoom() {
    this.router.navigate(['rooms/add'])
  }

}
