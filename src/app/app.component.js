import {Component, OnInit, Inject} from 'angular2/core';
import {MyAppService} from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [MyAppService]
})
export class AppComponent implements OnInit {
  title = 'Hello World!';

  constructor(myAppService:MyAppService) {
    this.myAppService = myAppService;
  }

  ngOnInit() {
    this.title = this.myAppService.getList().join(',');
  }
}
