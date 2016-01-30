import { Component, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';

import { Crisis, CrisisService } from './crisis.service';

@Component({
  template: `
    <ul>
      <li *ngFor="#crisis of crises"
        [class.selected]="isSelected(crisis)"
        (click)="onSelect(crisis)">
        <span class="badge">{{crisis.id}}</span> {{crisis.name}}
      </li>
    </ul>
  `
})
export class CrisisListComponent implements OnInit {
  crises;
  selectedId;

  constructor(service:CrisisService,
              router:Router,
              routeParams:RouteParams) {
    this.service = service;
    this.router = router;
    this.routeParams = routeParams;
    this.selectedId = +routeParams.get('id');
  }

  isSelected(crisis) {
    return crisis.id === this.selectedId;
  }

  ngOnInit() {
    this.service.getCrises().then(crises => this.crises = crises);
  }

  onSelect(crisis:Crisis) {
    this.router.navigate(['CrisisDetail', { id: crisis.id }]);
  }
}
