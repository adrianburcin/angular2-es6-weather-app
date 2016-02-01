import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import Slideout from '../vendors/slideout.js';

import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'weather-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES]
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
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
    this.slideout = new Slideout({
      panel: document.getElementById('slideout-content'),
      menu: document.getElementById('slideout-menu'),
      padding: 256,
      tolerance: 70
    });
  }

  toggleMenu() {
    this.slideout.toggle();
  }
}
