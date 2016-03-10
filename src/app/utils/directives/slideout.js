import { Directive, Inject, ElementRef, TemplateRef, ViewContainerRef, EventEmitter } from 'angular2/core';

import Slideout from 'vendors/slideout.js';
import * as _ from 'vendors/lodash.js';


/**
 * <slideout (onBeforeOpen)="onBeforeOpen()" (onBeforeClose)="onBeforeClose()">
 *    <div *slideoutItem="'menu'">Menu header + items</div>
 *    <div *slideoutItem="'content'">Page content</div>
 * </slideout>
 */

export class SlideoutService {
  slideoutInstance;

  constructor() {
  }

  set slideout(slideoutInstance) {
    this.slideoutInstance = slideoutInstance;
  }

  get slideout() {
    return this.slideoutInstance;
  }
}

export class SlideoutDirective {
  directives;
  slideoutService;
  onBeforeOpen;
  onBeforeClose;

  static parameters = [
    new Inject(SlideoutService)
  ];

  static annotations = [
    new Directive({
      selector: 'slideout',
      outputs: ['onBeforeOpen', 'onBeforeClose']
    })
  ];

  constructor(slideoutService) {
    this.directives = [];
    this.slideoutService = slideoutService;
    this.onBeforeClose = new EventEmitter();
    this.onBeforeOpen = new EventEmitter();
  }

  ngAfterContentInit() {
    if (this.directives.length) {
      const contentDirective = _.find(this.directives, { role: 'content' });
      const menuDirective = _.find(this.directives, { role: 'menu' });

      const contentContext = contentDirective && contentDirective.context;
      const menuContext = menuDirective && menuDirective.context;

      if (menuContext && contentContext) {
        this.slideout = new Slideout({
          panel: contentContext.elementRef.nativeElement.nextSibling,
          menu: menuContext.elementRef.nativeElement.nextSibling,
          padding: 256,
          tolerance: 70
        });

        this.slideout
          .on('beforeopen', () => {
            this.onBeforeOpen.emit(true);
          });

        this.slideout
          .on('beforeclose', () => {
            this.onBeforeClose.emit(true);
          });

        this.slideoutService.slideout = this.slideout;
      } else {
        this.slideoutService.slideout = null;
        throw new Error(`Slideout items are not defined correctly.
          Usage:
          <slideout>
            <div *slideoutItem="'menu'">Menu header + items</div>
            <div *slideoutItem="'content'">Page content</div>
          </slideout>
          `);
      }
    }
  }

  registerComponent(component) {
    this.directives.push(component);
  }
}

export class SlideoutItemDirective {

  static annotations = [
    new Directive({
      selector: '[slideoutItem]',
      inputs: ['slideoutItem']
    })
  ];

  static parameters = [
    new Inject(ElementRef),
    new Inject(TemplateRef),
    new Inject(ViewContainerRef),
    new Inject(SlideoutDirective)
  ];

  constructor(elementRef, templateRef, viewContainerRef, slideout) {
    this.elementRef = elementRef;
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.slideout = slideout;
  }

  set slideoutItem(role) {
    if (role) {
      this.slideout.registerComponent({ role, context: this });
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}

export const SLIDEOUT_DIRECTIVES = [SlideoutDirective, SlideoutItemDirective];
