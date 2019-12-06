import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Weather } from '../models/weather';
import { StateService } from '../services/state.service';
import { City } from '../models/city';
import { WeatherService } from '../services/weather.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { WeatherDetails } from '../models/weatherDetails';
import { WeatherDaysForecastDetails } from '../models/weatherDaysForecastDetails';
import { element } from 'protractor';
import { DailyForecast } from '../models/dailyForecast';



@Component({
  selector: 'app-show-weather',
  templateUrl: './show-weather.component.html',
  styleUrls: ['./show-weather.component.css']
})
export class ShowWeatherComponent implements OnInit {

  favoritesText = 'Add To Favorites';
  selectedCity: string;

  displayedCity = '';
  celcius = true;
  temperature = 0;
  displayedWeatherText = '';

  weatherIconPath = '../../assets/img/icons/';
  displayedWeatherIcon = this.weatherIconPath + '1-s.png';

  favorites: Weather[] = [];
  currentWeather: Weather;

  myControl = new FormControl();
  cities: City[] = [];

  weatherDetails: WeatherDetails[] = [];

  displayedCities: { city: string, key: string }[] = [];

  filteredOptions: Observable<{ city: string, key: string }[]>;


  detailedDaysForecast: WeatherDaysForecastDetails = { Headline: null, DailyForecasts: [] };

  daysForecast: DailyForecast[] = [];

  constructor(private weatherList: StateService, private weatherService: WeatherService) {

  }

  ngOnInit() {
    // default key for Tel Aviv
    let temp = { city: 'Tel Aviv', key: '215854' };
    this.weatherList.weather.subscribe(favorites => { this.favorites = favorites; this.updateWeather(temp) });



    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  private _filter(value: string): { city: string, key: string }[] {
    const filterValue = value.toLowerCase();

    return this.displayedCities.filter(item => item.city.toLowerCase().includes(filterValue));
  }

  updateWeather(value) {
    this.selectedCity = value.city;

    this.weatherDetails = [];
    this.weatherService.getCityWeather(value.key).subscribe(weather => { this.weatherDetails = weather; this.displayWeather(value) });
    this.getDaysForecast(value.key);

    if (!this.isInFavorites())
      this.favoritesText = 'Add To Favorites';
    else
      this.favoritesText = 'Remove From Favorites';
  }

  displayWeather(value) {
    this.currentWeather = {
      key: value.key,
      CityName: value.city,
      WeatherText: this.weatherDetails[0].WeatherText,
      WeatherIcon: this.weatherDetails[0].WeatherIcon,
      TemperatureC: this.weatherDetails[0].Temperature.Metric.Value,
      TemperatureF: this.weatherDetails[0].Temperature.Imperial.Value
    }


    this.displayedCity = this.currentWeather.CityName;
    this.celcius ? this.temperature = this.currentWeather.TemperatureC : this.temperature = this.currentWeather.TemperatureF;
    this.displayedWeatherText = this.currentWeather.WeatherText;
    this.displayedWeatherIcon = this.weatherIconPath + this.currentWeather.WeatherIcon + '-s.png';

  }



  displayCities(event) {
    this.weatherService.getCities(event.target.value).subscribe(cities => this.cities = cities);
    this.displayedCities = [];

    this.cities.forEach(element => {
      this.displayedCities.push(
        { city: element.LocalizedName, key: element.Key }
      );
    });
  }



  getDaysForecast(key) {
    this.detailedDaysForecast = { Headline: null, DailyForecasts: [] };

    this.weatherService.getFiveDaysForecast(key).subscribe(forecast => { this.detailedDaysForecast = forecast; this.updateDailyForecast() });

    //console.log(JSON.stringify(this.detailedDaysForecast));
  }

  updateDailyForecast() {
    this.daysForecast = [];

    this.detailedDaysForecast.DailyForecasts.forEach(element => {
      let day = new Date(element.Date).getDay();
      let dayName = '';
      day == 0 ? dayName = 'Sun' : null;
      day == 1 ? dayName = 'Mon' : null;
      day == 2 ? dayName = 'Tue' : null;
      day == 3 ? dayName = 'Wed' : null;
      day == 4 ? dayName = 'Thu' : null;
      day == 5 ? dayName = 'Fri' : null;
      day == 6 ? dayName = 'Sat' : null;

      this.daysForecast.push(
        {
          Day: dayName,
          Temperature: element.Temperature.Maximum.Value
        }
      )
    });
  }


  addRemoveFavorites() {
    if (!this.isInFavorites()) {
      this.favorites.push(this.currentWeather);
    } else { this.removeFromFavorites(); }
    this.updateWeatherFavorites();

  }

  isInFavorites() {
    let exist = false;
    this.favorites.forEach(element => {
      if (element.key == this.currentWeather.key) {
        exist = true;
        this.favoritesText = 'Remove From Favorites';

      }
    });
    return exist;
  }

  removeFromFavorites() {
    let index = 0;
    this.favorites.forEach(element => {
      if (element.key == this.currentWeather.key)
        index = this.favorites.indexOf(element, 0);
    });
    this.favorites.splice(index, 1);
    this.favoritesText = 'Add To Favorites';
  }

  updateWeatherFavorites() {
    this.weatherList.updateWeatherList(this.favorites);
  }
}

