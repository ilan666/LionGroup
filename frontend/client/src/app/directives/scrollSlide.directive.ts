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
  selector: '[appScrollSlide]',
  standalone: true,
})
export class ScrollSlideDirective implements AfterViewInit {
  @Input() showClass: string = 'show'; // A class to show the element
  @Input() hideClass: string = 'hide'; // A class to hide the element
  @Input() delay: string = ''; // A class to hide the element

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.setAnimationDelay();
    this.show(); // Trigger initial slide-in
  }

  // Use HostListener to listen for scroll events
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPosition = scrollTop / docHeight;

    // Calculate 30% of page scroll position
    if (scrollPosition >= 0.05) {
      this.hide();
    } else {
      this.show();
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
}
