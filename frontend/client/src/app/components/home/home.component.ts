import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';

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
  currentIndex: number = 0;
  totalSections: number = 5;

  constructor() {}

  ngOnInit(): void {}

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });

      switch (sectionId) {
        case 'web-design':
          this.currentIndex = 0;
          break;
        case 'api-development':
          this.currentIndex = 1;
          break;
        case 'seo-optimization':
          this.currentIndex = 2;
          break;
        case 'e-commerce':
          this.currentIndex = 3;
          break;
        case 'bio':
          this.currentIndex = 4;
          break;
      }
    }

    this.updateSlider();
  }

  nextSection() {
    if (this.currentIndex < this.totalSections - 1) {
      this.currentIndex++; // Increment index to show next section
    } else {
      this.currentIndex = 0; // Reset to first section
    }
    this.updateSlider();
  }

  previousSection() {
    if (this.currentIndex > 0) {
      this.currentIndex--; // Decrement index to show previous section
    } else {
      this.currentIndex = this.totalSections - 1; // Go to last section
    }
    this.updateSlider();
  }

  private updateSlider() {
    // Select the scroll-sections container and assert its type to HTMLElement
    const scrollSections = document.querySelector(
      '.scroll-sections'
    ) as HTMLElement;
    const sectionWidth = 100 / this.totalSections; // Each section takes up 20% width in a 5-section layout
    const translateX = this.currentIndex * -sectionWidth + '%'; // Calculate translation

    if (scrollSections) {
      scrollSections.style.transform = `translateX(${translateX})`; // Apply translation
    }
  }
}
