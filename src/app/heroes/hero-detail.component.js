import {Component,  OnInit}  from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {Hero, HeroService}   from './hero.service';

@Component({
  template: `
  <h2>HEROES</h2>
  <div *ngIf="hero">
    <h3>"{{hero.name}}"</h3>
    <div>
      <label>Id: </label>{{hero.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <button (click)="gotoHeroes()">Back</button>
  </div>
  `
})
export class HeroDetailComponent implements OnInit {
  hero;

  constructor(router:Router,
              routeParams:RouteParams,
              service:HeroService) {
    this.router = router;
    this.routeParams = routeParams;
    this.service = service;
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.service.getHero(id).then(hero => this.hero = hero);
  }

  gotoHeroes() {
    let heroId = this.hero ? this.hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Add a totally useless `foo` parameter for kicks.
    this.router.navigate(['Heroes', {id: heroId, foo: 'foo'}]);
  }
}