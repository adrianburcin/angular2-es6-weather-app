import { Component, OnInit } from 'angular2/core';
import { RouteParams, Router, CanDeactivate } from 'angular2/router';

import { CrisisService } from './crisis.service';
import { DialogService } from '../dialog.service';

@Component({
  template: `
  <div *ngIf="crisis">
    <h3>"{{editName}}"</h3>
    <div>
      <label>Id: </label>{{crisis.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="editName" placeholder="name"/>
    </div>
    <button (click)="save()">Save</button>
    <button (click)="cancel()">Cancel</button>
  </div>
  `,
  styles: ['input {width: 20em}']
})

export class CrisisDetailComponent implements OnInit, CanDeactivate {

  crisis;
  editName;

// Angular 2 DI
  static get parameters() {
    return [CrisisService, Router, RouteParams, DialogService];
  }

  constructor(service, router, routeParams, dialog) {
    this.service = service;
    this.router = router;
    this.routeParams = routeParams;
    this.dialog = dialog;
  }

  ngOnInit() {
    const id = +this.routeParams.get('id');
    this.service.getCrisis(id).then(crisis => {
      if (crisis) {
        this.editName = crisis.name;
        this.crisis = crisis;
      } else { // id not found
        this.gotoCrises();
      }
    });
  }

  routerCanDeactivate() {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged.
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialog.confirm('Discard changes?');
  }

  cancel() {
    this.editName = this.crisis.name;
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  gotoCrises() {
    const crisisId = this.crisis ? this.crisis.id : null;
    // Pass along the hero id if available
    // so that the CrisisListComponent can select that hero.
    // Add a totally useless `foo` parameter for kicks.
    this.router.navigate(['CrisisCenter', {id: crisisId, foo: 'foo'}]);
  }
}
