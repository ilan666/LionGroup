import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-cards-section',
  templateUrl: './service-cards-section.component.html',
  styleUrls: [
    './service-cards-section.component.scss',
    '../../../directives/scrollVisible.directive.scss',
  ],
})
export class ServiceCardsSectionComponent implements OnInit {
  openWindow: boolean = false;

  constructor() {}

  ngOnInit() {}

  closeContactWindow() {
    this.openWindow = false;
  }
}
