import { Component, OnInit, Input, Output } from '@angular/core';
import { Weather } from '../models/weather';
import { StateService } from '../services/state.service';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  darkMode = false;

  DEFAULT_CITY = 'Tel Aviv';
  DEFAULT_KEY = '215854';

  weatherList: Weather[];
  weatherIconPath = '../../assets/img/icons/';

  celcius = true;

  CELCIUS_SIGN = ' C°';
  FAHRENHEIT_SIGN = ' F°';

  temperatureSign = this.CELCIUS_SIGN;

  selectedWeather: Weather;

  constructor(private data: StateService, private router: Router) { }

  ngOnInit() {


    this.weatherList = JSON.parse(localStorage.getItem('favorites'));
    this.data.updateWeatherList(this.weatherList);


    localStorage.getItem('darkMode') == 'true' ? this.darkMode = true : this.darkMode = false;
    this.temperatureSign = localStorage.getItem('temperatureSign');
    this.data.weather.subscribe(weatherList => this.weatherList = weatherList);
  }

  selectFavoritesWeather(item) {
    localStorage.setItem('city', item.CityName);
    localStorage.setItem('key', item.key);
    this.router.navigate(['home']);
  }

  clearFavorites() {
    this.weatherList = [];
    localStorage.setItem('city', this.DEFAULT_CITY);
    localStorage.setItem('key', this.DEFAULT_KEY);
    localStorage.setItem('favorites', '[]');

    //this.data.weather.subscribe(weatherList => this.weatherList = weatherList);
    this.data.updateWeatherList(this.weatherList);

    window.location.reload();
  }
}
