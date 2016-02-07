import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SLIDEOUT_DIRECTIVES, SlideoutService } from './utils/directives/slideout.js';


@Component({
  selector: 'weather-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, SLIDEOUT_DIRECTIVES],
  providers: [SlideoutService]
})
@RouteConfig([
  {
    path: '/',
    name: 'root',
    redirectTo: ['/Dashboard']
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  }
])
export class AppComponent {
  slideoutService;

  static parameters = [SlideoutService];

  constructor(slideoutService) {
    this.slideoutService = slideoutService;
  }

  toggleMenu() {
    if (this.slideoutService.slideout) {
      this.slideoutService.slideout.toggle();
    }
  }
}
