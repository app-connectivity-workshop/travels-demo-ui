import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelsService } from '../travels.service';
import { CityDetails } from '../models/city-details.model';
import { City } from '../models/city.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {
  travelId = "blue"
  private route:ActivatedRoute;
  cities: City[];
  cityDetails: CityDetails;
  private travelsService:TravelsService;

  @Input() selectedCity;


  
  constructor(route: ActivatedRoute, travelsService:TravelsService) {
    this.route = route;
    this.cities = [];
    this.cityDetails = new CityDetails;
    this. travelsService = travelsService;
    this.selectedCity = "Choose your city";
  }


  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    console.log("routeParams", routeParams)
    this.travelId = String(routeParams.get('travelid'));
    this.fetchCities();
    console.log("travelId from route", this.travelId)
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
