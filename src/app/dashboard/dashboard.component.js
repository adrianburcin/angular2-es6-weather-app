import { Component } from 'angular2/core';

import { InputDebounceComponent } from '../utils/components/input-debounce.component.js';
import { Cities } from '../utils/services/cities.service';

@Component({
  template: `
    <h2>Weather</h2>
        <input-debounce
          [delay]="'500'"
          [placeholder]="'Search...'"
          (callback)="searchChanged($event)"
          [value]="selectedCity">
        </input-debounce>
    <ul>
      <li *ngFor="#city of cities"
        (click)="onSelectCity(city)">
        <span>{{city.description}}</span>
      </li>
    </ul>
  `,
  providers: [Cities],
  directives: [InputDebounceComponent]
})
export class DashboardComponent {

  cities = [];
  selectedCity;

  // Angular 2 DI
  static get parameters() {
    return [Cities];
  }

  constructor(citiesService) {
    this.citiesService = citiesService;
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
}
