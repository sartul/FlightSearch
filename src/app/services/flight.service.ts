import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { Flight } from '../Models/Flight';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FlightService {
  private serviceUrl = "http://localhost:8882/searchFlights"
  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getFlightDetails (flightNumber:string, origin:string,destination:string,date:Date): Observable<Flight[]> {
    let queryParameters;
    queryParameters = flightNumber ? "f=" + flightNumber : "";
    queryParameters += origin ? "ori=" + origin : "";
    queryParameters += destination ? "des=" + destination : "";
    queryParameters += date ? "d=" + date : "";
    let api = this.serviceUrl + "?" + queryParameters;
    console.log(api);
    return this.http.get<Flight[]>(api)
      .pipe(
        tap(flight => this.log(`Flight detial retrived.`)),
        catchError(this.handleError<Flight[]>('Flight servie error.'))
      );
  }

  private handleError<T> (operation = 'Flight servie error', result?: T) {
    return (error: any): Observable<T> => {
      //Log error
      this.log(error);
      // returning an empty result.
      return of(result as T);
    };
  }

  log(message:string){
     console.log(message);
  }
}
