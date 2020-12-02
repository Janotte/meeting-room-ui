import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { tap } from 'rxjs/operators';

import { Room } from '../../models';
import { RoomService } from './../../services';
import { AlertService } from './../../../alert';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  roomId: number;
  room = new Room();
  submitted = false;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    public title: Title,
    public message: AlertService,
  ) { }

  ngOnInit(): void {
    this.roomId = +this.route.snapshot.paramMap.get('id');

    this.title.setTitle('Nova Sala');

    if (this.roomId) {
      this.getRoom(this.roomId);

    }
  }

  get editing() {
    return Boolean(this.roomId);
  }

  getRoom(id: number) {
    this.roomService.findById(id).pipe(

    )
      .subscribe(data => { this.room = data });
  }

  onSubmit(form: FormControl) {
    this.submitted = true;
    this.save(form);
  }

  save(form: FormControl): void {
    if (this.editing) {
      this.updateRoom(form);
    } else {
      this.addRoom(form);
    }
  }

  addRoom(form: FormControl): void {
    this.submitted = false;
    this.roomService.add(this.room)
      .pipe(
        tap(_ => {
          this.message.success('Sala criada com sucesso!', { autoClose: true });
          setTimeout(function () {
            this.cancel();
          }.bind(this), 3000);
        })).subscribe();
  }

  updateRoom(form: FormControl) {
    this.roomService.update(this.room)
      .pipe(
        tap(room => {
          this.room = room;
          this.message.success('Sala atualizado com sucesso!', { autoClose: true });
          setTimeout(function () {
            this.cancel();
          }.bind(this), 3000);
        })).subscribe();
  }

  newRoom(form: FormControl): void {
    form.reset();

    setTimeout(function () {
      this.room = new Room();
    }.bind(this), 1);

    this.router.navigate(['/rooms/add']);
  }

  cancel(): void {
    this.router.navigate(['/rooms']);
  }

}
