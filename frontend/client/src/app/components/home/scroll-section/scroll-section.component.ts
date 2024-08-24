import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scroll-section',
  templateUrl: './scroll-section.component.html',
  styleUrls: [
    './scroll-section.component.scss',
    '../../../directives/scrollVisible.directive.scss',
    '../../../directives/scrollSlideRight.directive.scss',
    '../../../directives/scrollSlideLeft.directive.scss',
  ],
})
export class ScrollSectionComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToServices() {
    this.router.navigate(['/services']);
  }
}
