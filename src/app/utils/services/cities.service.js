import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()
export class Cities {

  // Angular 2 DI
  static get parameters() {
    return [Http, 'apiUrls'];
  }

  constructor(http, apiUrls) {
    this.http = http;
    this.apiUrls = apiUrls;
  }

  getSuggestions(city) {
    const url = `${this.apiUrls.base}${this.apiUrls.endpoints.cities}${city}`;
    return this.http.get(url, {});
  }
}
