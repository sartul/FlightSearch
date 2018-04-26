import { Component } from '@angular/core';
import {FlightService} from './services/flight.service';
import {Flight} from './Models/Flight';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private errorMessage :string;
  private flights : Flight[]; 
  constructor(private flightService:FlightService){
  }

  SearchFlights(flightNumber:string, origin:string,destination:string,date:Date)
  { 
    this.errorMessage = (flightNumber || (origin && destination)) && date ? "" 
    : "Please enter one of the search combination 1) Flight Number and Date or 2) Origin and Destination and Date";
    if(!this.errorMessage)
    {
      this.flightService.getFlightDetails(flightNumber,origin,destination,date)
      .subscribe(flights => 
        {
          this.flights = flights;
        });
    }
    return false;
  }
}
