import { Component, OnInit,Input } from '@angular/core';
import { TravelsService } from '../travels.service';
import { CityDetails } from '../models/city-details.model';
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


  @Input() selectedCity;


  
  constructor( travelsService:TravelsService) {

    this.cities = [];
    this.portalId = new WhoAmI;
    this.cityDetails = new CityDetails;
    this. travelsService = travelsService;
    this.selectedCity = "Choose your city";
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
    this.travelsService.fetchDetailsForCity(city)
    .subscribe(cityDetails => (this.cityDetails = cityDetails));
  }

}
