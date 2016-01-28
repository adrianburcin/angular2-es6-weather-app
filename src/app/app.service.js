import {Injectable} from 'angular2/core';

@Injectable()
export class MyAppService {
    getList() {
        return [1,2,3,4,5];
    }
}