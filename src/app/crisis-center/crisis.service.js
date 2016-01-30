import {Injectable} from 'angular2/core';

export class Crisis {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

@Injectable()
export class CrisisService {
  getCrises() {
    return crisesPromise;
  }

  getCrisis(id) {
    return crisesPromise
      .then(crises => crises.filter(c => c.id === +id)[0]);
  }


  static nextCrisisId = 100;

  addCrisis(name) {
    name = name.trim();
    if (name) {
      let crisis = new Crisis(CrisisService.nextCrisisId++, name);
      crisesPromise.then(crises => crises.push(crisis));
    }
  }
}

var crises = [
  new Crisis(1, 'Princess Held Captive'),
  new Crisis(2, 'Dragon Burning Cities'),
  new Crisis(3, 'Giant Asteroid Heading For Earth'),
  new Crisis(4, 'Release Deadline Looms')
];

var crisesPromise = Promise.resolve(crises);