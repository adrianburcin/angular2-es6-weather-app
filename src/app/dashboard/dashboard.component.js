import { Component } from 'angular2/core';

import { InputDebounceComponent } from '../utils/components/input-debounce.component.js';
import { Cities } from '../utils/services/cities.service';
import { Weather } from '../utils/services/weather.service';

@Component({
  template: `
    <h2>Your location</h2>
        <input-debounce
          [delay]="'500'"
          [placeholder]="'Search...'"
          (callback)="searchChanged($event)"
          [value]="selectedCity">
        </input-debounce>
        <button (click)="getWeatherForSelectedCity()">Search</button>
    <ul>
      <li *ngFor="#city of cities"
        (click)="onSelectCity(city)">
        <span>{{city.description}}</span>
      </li>
    </ul>

    <p *ngIf="weatherForCity">{{weatherForCity.weather.current.temp}} {{weatherForCity.weather.current.umTemp}} - {{weatherForCity.weather.current.text}},
    {{weatherForCity.weather.location.city}}, {{weatherForCity.weather.location.country}}</p>
  `,
  providers: [Cities, Weather],
  directives: [InputDebounceComponent]
})
export class DashboardComponent {

  cities = [];
  selectedCity;
  weatherForCity;

  // Angular 2 DI
  static get parameters() {
    return [Cities, Weather];
  }

  constructor(citiesService, weatherService) {
    this.citiesService = citiesService;
    this.weatherService = weatherService;
  }

  searchChanged(value) {
    this.citiesService
      .getSuggestions(value)
      .subscribe((response) => {
        const responseParsed = response.json();
        this.cities = responseParsed.cities || [];
      });
  }

  onSelectCity(city) {
    this.selectedCity = city.description;
    this.cities = [];
  }

  getWeatherForSelectedCity() {
    if (this.selectedCity) {
      this.weatherService
        .getWeatherForCity(this.selectedCity)
        .subscribe((response) => {
          const responseParsed = response.json();
          this.weatherForCity = responseParsed;
        });
    }
  }
}
