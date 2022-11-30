import { Component, OnInit,Input } from '@angular/core';
import { TravelsService } from '../travels.service';
import { Car, CityDetails, Flight, Hotel, Insurance } from '../models/city-details.model';
import { City } from '../models/city.model';
import { WhoAmI } from '../models/whoami.model';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {
  portalId: WhoAmI;
  cities: City[];
  cityDetails: CityDetails;
  private travelsService:TravelsService;
  startdate: any
  enddate: any
  selectedFlight:Flight 
  selectedHotel:Hotel
  selectedCar: Car
  selectedInsurance:Insurance
  bookingRef: String
  flightoption = null;


  @Input() selectedCity;


  
  constructor( travelsService:TravelsService) {

    this.cities = [];
    this.portalId = new WhoAmI;
    this.cityDetails = new CityDetails;
    this. travelsService = travelsService;
    this.selectedCity = "Choose your city";
    this.selectedFlight = new Flight;
    this.selectedHotel = new Hotel;
    this.selectedCar = new Car;
    this.selectedInsurance = new Insurance;
    this.bookingRef = ""

  }


  ngOnInit(): void {

    this.fetchCities();
    this.fetchWhoAmI();
    

  }

  fetchWhoAmI() {
    console.log("component fetchCities")
    this.travelsService.fetchWhoAmI()
    .subscribe(output => (this.portalId = output));
  }


  fetchCities() {
    console.log("component fetchCities")
    this.travelsService.fetchCities()
    .subscribe(cities => (this.cities = cities));
  }

  fetchDetailsForCity(city: String) {
    this.bookingRef = '';
    this.resetSelection();
    this.travelsService.fetchDetailsForCity(city)
    .subscribe(cityDetails => (this.cityDetails = cityDetails));
  }

  resetSelection () {
    this.selectedCar = new Car
    this.selectedFlight = new Flight
    this.selectedHotel = new Hotel
    this.selectedInsurance = new Insurance

  }
  book() {
    this.bookingRef = "" + this.getUniqueId(4)
    this.cityDetails = new CityDetails;

  }

  /**
 * generate groups of 4 random characters
 * @example getUniqueId(1) : 607f
 * @example getUniqueId(2) : 95ca-361a-f8a1-1e73
 */
   getUniqueId(parts: number): string {
  const stringArr = [];
  for(let i = 0; i< parts; i++){
    // tslint:disable-next-line:no-bitwise
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');
}

  total(){
    return this.selectedCar.price + this.selectedFlight.price + this.selectedHotel.price +  this.selectedInsurance.price
  }
}
