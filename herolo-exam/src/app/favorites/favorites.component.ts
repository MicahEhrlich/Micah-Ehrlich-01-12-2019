import { Component, OnInit, Input } from '@angular/core';
import { Weather } from '../models/weather';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  weatherList: Weather[];
  weatherIconPath = '../../assets/img/icons/';
  displayedWeatherIcon = this.weatherIconPath;


  constructor(private data: StateService) { }

  ngOnInit() {
    this.data.weather.subscribe(weatherList => this.weatherList = weatherList);

  }



}
