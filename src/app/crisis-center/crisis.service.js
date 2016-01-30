import { Injectable } from 'angular2/core';

export class Crisis {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

const crises = [
  new Crisis(1, 'Princess Held Captive'),
  new Crisis(2, 'Dragon Burning Cities'),
  new Crisis(3, 'Giant Asteroid Heading For Earth'),
  new Crisis(4, 'Release Deadline Looms')
];

const crisesPromise = Promise.resolve(crises);

@Injectable()
export class CrisisService {
  getCrises() {
    return crisesPromise;
  }

  getCrisis(id) {
    return crisesPromise
      .then(crisesArray => crisesArray.filter(c => c.id === +id)[0]);
  }

  static nextCrisisId = 100;

  addCrisis(name) {
    const nameTrim = name.trim();
    if (nameTrim) {
      const crisis = new Crisis(CrisisService.nextCrisisId++, nameTrim);
      crisesPromise.then(crisesArray => crisesArray.push(crisis));
    }
  }
}
