import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
    '../../directives/scrollSlide.directive.css',
    '../../directives/scrollVisible.directive.css',
    './heroSection.scss',
    './servicesCardsSection.scss',
    './servicesSection.scss',
    './aboutSection.scss',
    './contactSection.scss',
  ],
})
export class HomeComponent implements OnInit {
  contactForm: FormGroup;
  currentIndex: number = 0;
  totalSections: number = 4;
  showContactWindow = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required], // No built-in validation for syntax
      phone: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {}

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    this.updateSlider();
  }

  scrollToServicesSection(index: number): void {
    const section = document.getElementById('scroll-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      this.currentIndex = index;
      this.updateSlider();
    }
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

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value); // Handle successful submission here
    } else {
      console.log('Form is invalid');
    }
  }
}
