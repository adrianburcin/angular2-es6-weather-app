import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import { APIUrls } from '../../configs/api';

@Injectable()
export class Weather {

  // Angular 2 DI
  static get parameters() {
    return [Http];
  }

  constructor(http) {
    this.http = http;
  }

  getWeatherForCity(city) {
    const url = `${APIUrls.base}${APIUrls.endpoints.weather}${city}`;
    return this.http.get(url, {});
  }
}
