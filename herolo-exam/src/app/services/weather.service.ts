import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Weather } from '../models/weather';
import { City } from '../models/city';
import { WeatherDetails } from '../models/weatherDetails';
import { WeatherDaysForecastDetails } from '../models/weatherDaysForecastDetails';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  API_KEY = 'nNM3vUZ3Aw5898bzM664AzVUAqs7GUla';

  API_SERVER = 'http://dataservice.accuweather.com';

  SEARCH_CITY_URL = this.API_SERVER + '/locations/v1/cities/autocomplete?apikey=';

  CITY_WEATHER_URL = this.API_SERVER + '/currentconditions/v1/';

  FIVE_DAYS_FORECAST_URL = this.API_SERVER + '/forecasts/v1/daily/5day/';

  CITY = [
    {
      "Version": 1,
      "Key": "215854",
      "Type": "City",
      "Rank": 31,
      "LocalizedName": "Tel Aviv",
      "Country": {
        "ID": "IL",
        "LocalizedName": "Israel"
      },
      "AdministrativeArea": {
        "ID": "TA",
        "LocalizedName": "Tel Aviv"
      }
    },
    {
      "Version": 1,
      "Key": "215855",
      "Type": "City",
      "Rank": 31,
      "LocalizedName": "Tokyo",
      "Country": {
        "ID": "IL",
        "LocalizedName": "Israel"
      },
      "AdministrativeArea": {
        "ID": "TA",
        "LocalizedName": "Tel Aviv"
      }
    }
  ];

  CITY_WEATHER = [
    {
      "LocalObservationDateTime": "2019-12-05T19:45:00+02:00",
      "EpochTime": 1575567900,
      "WeatherText": "A shower",
      "WeatherIcon": 12,
      "HasPrecipitation": true,
      "PrecipitationType": "Rain",
      "IsDayTime": false,
      "Temperature": {
        "Metric": {
          "Value": 19.5,
          "Unit": "C",
          "UnitType": 17
        },
        "Imperial": {
          "Value": 67,
          "Unit": "F",
          "UnitType": 18
        }
      },
      "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
    }
  ];

  FIVE_DAYS_FORECAST = {
    "Headline": {
      "EffectiveDate": "2019-12-09T01:00:00+02:00",
      "EffectiveEpochDate": 1575846000,
      "Severity": 3,
      "Text": "Expect rainy weather late Sunday night through Monday evening",
      "Category": "rain",
      "EndDate": "2019-12-10T01:00:00+02:00",
      "EndEpochDate": 1575932400,
      "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us"
    },
    "DailyForecasts": [
      {
        "Date": "2019-12-05T07:00:00+02:00",
        "EpochDate": 1575522000,
        "Temperature": {
          "Minimum": {
            "Value": 13.8,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 21.1,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 14,
          "IconPhrase": "Partly sunny w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 39,
          "IconPhrase": "Partly cloudy w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"
      },
      {
        "Date": "2019-12-06T07:00:00+02:00",
        "EpochDate": 1575608400,
        "Temperature": {
          "Minimum": {
            "Value": 12.1,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 20.6,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 14,
          "IconPhrase": "Partly sunny w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 36,
          "IconPhrase": "Intermittent clouds",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us"
      },
      {
        "Date": "2019-12-07T07:00:00+02:00",
        "EpochDate": 1575694800,
        "Temperature": {
          "Minimum": {
            "Value": 12.7,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 19.4,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 3,
          "IconPhrase": "Partly sunny",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 36,
          "IconPhrase": "Intermittent clouds",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us"
      },
      {
        "Date": "2019-12-08T07:00:00+02:00",
        "EpochDate": 1575781200,
        "Temperature": {
          "Minimum": {
            "Value": 14.3,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 18.7,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 18,
          "IconPhrase": "Rain",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 12,
          "IconPhrase": "Showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Moderate"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us"
      },
      {
        "Date": "2019-12-09T07:00:00+02:00",
        "EpochDate": 1575867600,
        "Temperature": {
          "Minimum": {
            "Value": 13.8,
            "Unit": "C",
            "UnitType": 17
          },
          "Maximum": {
            "Value": 18.9,
            "Unit": "C",
            "UnitType": 17
          }
        },
        "Day": {
          "Icon": 18,
          "IconPhrase": "Rain",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Night": {
          "Icon": 40,
          "IconPhrase": "Mostly cloudy w/ showers",
          "HasPrecipitation": true,
          "PrecipitationType": "Rain",
          "PrecipitationIntensity": "Light"
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us"
      }
    ]
  }

  constructor(private http: HttpClient) { }


  getCities(city): Observable<City[]> {

    return this.http.get<City[]>(this.SEARCH_CITY_URL + this.API_KEY + '&q=' + city);

    //return of(this.CITY);
  }

  getCityWeather(key): Observable<WeatherDetails[]> {
    //console.log(key);
    return this.http.get<WeatherDetails[]>(this.CITY_WEATHER_URL + key + '?apikey=' + this.API_KEY);

    //return of(this.CITY_WEATHER);
  }

  getFiveDaysForecast(key): Observable<WeatherDaysForecastDetails> {

    return this.http.get<WeatherDaysForecastDetails>(this.FIVE_DAYS_FORECAST_URL + key + '?apikey=' + this.API_KEY + '&metric=true');
    //return of(this.FIVE_DAYS_FORECAST);
  }
}


