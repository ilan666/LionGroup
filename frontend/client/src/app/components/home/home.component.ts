import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
    '../../directives/scrollSlide.directive.css',
    '../../directives/scrollVisible.directive.css',
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
