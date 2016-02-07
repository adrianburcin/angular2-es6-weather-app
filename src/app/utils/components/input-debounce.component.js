import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from 'angular2/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'input-debounce',
  template: `
    <input type="text" class="form-control" [placeholder]="placeholder" [(ngModel)]="inputValue">
  `
})
export class InputDebounceComponent implements OnInit {
  @Input() placeholder;
  @Input() delay = 300;
  @Output() callback = new EventEmitter();
  @Input('value') inputValue;

  // Angular 2 DI
  static get parameters() {
    return [ElementRef];
  }

  constructor(elementRef) {
    this.elementRef = elementRef;
  }

  ngOnInit() {
    const eventStream = Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
      .map(() => this.inputValue)
      .filter(() => this.inputValue.length > 2)
      .debounceTime(this.delay)
      .distinctUntilChanged();

    eventStream.subscribe(input => this.callback.emit(input));
  }
}
