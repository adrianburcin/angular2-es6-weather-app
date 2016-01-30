// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, OnInit}   from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {Hero, HeroService}   from './hero.service';

@Component({
  template: `
    <h2>HEROES</h2>
    <ul>
      <li *ngFor="#hero of heroes"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
  `
})
export class HeroListComponent implements OnInit {
  heroes;
  selectedId;

  constructor(service:HeroService,
              router:Router,
              routeParams:RouteParams) {
    this.service = service;
    this.router = router;
    this.routeParams = routeParams;
    this.selectedId = +routeParams.get('id');
  }

  isSelected(hero) {
    return hero.id === this.selectedId;
  }

  onSelect(hero) {
    this.router.navigate(['HeroDetail', {id: hero.id}]);
  }

  ngOnInit() {
    this.service.getHeroes().then(heroes => this.heroes = heroes)
  }
}