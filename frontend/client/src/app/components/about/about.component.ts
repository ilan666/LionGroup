import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollVisibleDirective } from '../../directives/scrollVisible.directive';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: [
    './about.component.scss',
    '../../directives/scrollVisible.directive.css',
  ],
})
export class AboutComponent {}
