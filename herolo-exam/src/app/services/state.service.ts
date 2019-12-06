import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private weatherList = new BehaviorSubject<Weather[]>([]);
  weather = this.weatherList.asObservable();

  constructor() { }

  updateWeatherList(weather: Weather[]) {
    this.weatherList.next(weather);
  }
}
