import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  input,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appScrollSlideRight]',
  standalone: true,
})
export class ScrollSlideRightDirective implements AfterViewInit {
  @Input() showClass: string = 'showToLeft'; // A class to show the element
  @Input() hideClass: string = 'hideToRight'; // A class to hide the element
  @Input() delay: string = ''; // A class to hide the element

  private sectionTop: number = 0;
  private sectionHeight: number = 0;
  private isBrowser: boolean = typeof window !== 'undefined';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setAnimationDelay();
    this.calculateSectionDimensions();
    this.onWindowScroll(); // Trigger initial check
  }

  // Use HostListener to listen for scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return; // Ensure window is defined

    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;

    // Calculate the top and bottom thresholds of the section
    const sectionVisibleTop = this.sectionTop + this.sectionHeight * 0.2;
    const sectionVisibleBottom = this.sectionTop + this.sectionHeight;

    // Check if the section is 20% visible from the top or fully visible from the bottom
    if (
      scrollPosition + viewportHeight >= sectionVisibleTop &&
      scrollPosition <= sectionVisibleBottom
    ) {
      this.show();
    } else {
      this.hide();
    }
  }

  setAnimationDelay() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'animation-delay',
      this.delay
    );
  }

  show() {
    this.renderer.addClass(this.el.nativeElement, this.showClass);
    this.renderer.removeClass(this.el.nativeElement, this.hideClass);
  }

  hide() {
    this.renderer.addClass(this.el.nativeElement, this.hideClass);
    this.renderer.removeClass(this.el.nativeElement, this.showClass);
  }

  calculateSectionDimensions() {
    const section = this.el.nativeElement.closest('section');
    if (section) {
      this.sectionTop = section.offsetTop;
      this.sectionHeight = section.offsetHeight;
    }
  }
}
