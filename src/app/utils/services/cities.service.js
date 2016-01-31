import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

import { APIUrls } from '../../configs/api';

@Injectable()
export class Cities {

  // Angular 2 DI
  static get parameters() {
    return [Http];
  }

  constructor(http) {
    this.http = http;
  }

  getSuggestions(city) {
    const url = `${APIUrls.base}${APIUrls.endpoints.cities}${city}`;
    return this.http.get(url, {});
  }
}
