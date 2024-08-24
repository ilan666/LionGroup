import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: [
    './hero-section.component.scss',
    '../../../directives/scrollSlideLeft.directive.scss',
    '../../../directives/scrollVisible.directive.scss',
  ],
})
export class HeroSectionComponent implements OnInit {
  constructor() {}

  openWindow: boolean = false;

  ngOnInit() {}

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  closeContactWindow() {
    this.openWindow = false;
  }
}
