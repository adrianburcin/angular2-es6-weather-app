import {Component, OnInit, Inject} from 'angular2/core';
import {MyAppService} from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
@Inject(MyAppService)
export class AppComponent implements OnInit {
  title = 'Hello World!';

  constructor() {
  }

  ngOnInit() {
    this.title = this.MyAppService.getList().join(',');
  }
}
