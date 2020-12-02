import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AlertService } from './../../alert';
import { Room } from '../models';

/**
 * Filter used for pagination, sorting and filtering.
 * 
 * @page Used to inform the index of the current page in the pagination.
 * @size Used to report the number of items per page in the pagination.
 * @orderBy Used to enter the name of the attribute by which to order.
 * @name Used to filter by the name attribute.
 * @initials Used to filter by the initials attribute.
 */
export class RoomFilter {
  page = 0;
  size = 10;
  orderBy: string;
  direction: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  roomsUrl = "http://localhost:8080/api/v1/rooms";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    protected alertService: AlertService,
  ) { }

  /**
   * GET: Returns all Room records, can be paged, sorted and filtered by name or initials. 
   * @param filter 
   */
  public findRooms(filter: RoomFilter): Observable<any> {
    let params = new HttpParams({
      fromObject: {}
    });

    if (filter.page) {
      params = params.append('page', filter.page.toString());
    }

    if (filter.size) {
      params = params.append('size', filter.size.toString());
    }

    if (filter.orderBy) {
      params = params.append('orderBy', filter.orderBy);
    }

    if (filter.direction) {
      params = params.append('direction', filter.direction);
    }

    if (filter.name) {
      params = params.append('name', filter.name);
    }

    return this.http.get<any>(`${this.roomsUrl}/filter`, { params }).pipe(
      tap(data => {
        const rooms = data.content;
        const result = {
          rooms,
          totalElements: data.totalElements
        };
        return result;
      }),
      catchError(e => this.errorHandler(e)));;
  }

  public findAll(): Observable<any> {
    return this.http.get<any>(this.roomsUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)));;
  }

  /**
   * GET: Gets a Room by id, used to view, update and delete a Room.
   * @param roomId 
   */
  public findById(roomId: number): Observable<any> {
    return this.http.get<Room>(`${this.roomsUrl}/${roomId}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)));;
  }

  /**
   * POST: Create a new Room.
   * @param Room 
   */
  public add(Room: Room): Observable<any> {
    return this.http.post<Room>(this.roomsUrl, Room, this.httpOptions).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)));
  }

  /**
   * PUT: Updates a Room by Id.
   * @param Room 
   */
  public update(Room: Room): Observable<any> {
    return this.http.put<Room>(`${this.roomsUrl}/${Room.id}`, Room, this.httpOptions).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)));;
  }

  /**
   *  DELETE: Deletes a Room by Id.
   * @param roomId 
   */
  public delete(id: number): Observable<Room> {
    return this.http.delete<Room>(`${this.roomsUrl}/${id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e)));;
  }

  /**
   * Displays error messages.
   * @param error 
   */
  errorHandler(error: any): Observable<any> {
    if (error.status === 0) {
      this.alertService.error('Tente mais tarde. Falha ao conectar servidor!');
    } else {
      this.alertService.error(error.error.message);
    }
    return EMPTY;
  }
}
