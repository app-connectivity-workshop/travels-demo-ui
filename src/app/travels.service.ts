import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { CityDetails } from "./models/city-details.model";
import { City } from "./models/city.model";
import { WhoAmI } from "./models/whoami.model";

const GET_CITIES = '/api/getcities';
const GET_DETAILS_FOR_CITY = '/api/getDetailsForCity';
const GET_WHOAMI =  '/api/whoami';


@Injectable()
export class TravelsService {
  

  private handleError: HandleError;
  http: HttpClient;
  
  static getRecommendedProducts: any;
  
  
  constructor(http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.http = http;
    this.handleError = httpErrorHandler.createHandleError('CoolStoreProductsService');
  }

 
  fetchCities(): Observable<any> {
    console.log('fetchCities called')
    return this.http.get<City>(GET_CITIES) 
      .pipe(
        catchError(this.handleError('fetchCities', ''))
      );
  }

  fetchWhoAmI(): Observable<any> {
    return this.http.get<WhoAmI>(GET_WHOAMI) 
      .pipe(
        catchError(this.handleError('fetchCities', ''))
      );
  }
  


  fetchDetailsForCity(city:String): Observable<any> {
    return this.http.get<CityDetails>(GET_DETAILS_FOR_CITY+"?city="+city) 
      .pipe(
        catchError(this.handleError('fetchDetailsForCity', ''))
      );
  }

  

}
