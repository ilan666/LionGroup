// import {
//   AfterViewInit,
//   Directive,
//   ElementRef,
//   Input,
//   Renderer2,
// } from '@angular/core';

// @Directive({
//   selector: '[appScrollRightSlide]',
//   standalone: true,
// })
// export class ScrollSlideRightDirective implements AfterViewInit {
//   @Input() showClass: string = 'show'; // A class to show the element
//   @Input() hideClass: string = 'hide'; // A class to hide the element
//   @Input() delay: string = ''; // Animation delay

//   private observer: IntersectionObserver;

//   constructor(private el: ElementRef, private renderer: Renderer2) {}

//   ngAfterViewInit() {
//     this.setAnimationDelay();
//     this.createObserver();
//   }

//   setAnimationDelay() {
//     if (this.delay) {
//       this.renderer.setStyle(
//         this.el.nativeElement,
//         'animation-delay',
//         this.delay
//       );
//     }
//   }

//   createObserver() {
//     this.observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           this.show();
//         } else {
//           this.hide();
//         }
//       });
//     });

//     this.observer.observe(this.el.nativeElement);
//   }

//   show() {
//     this.renderer.addClass(this.el.nativeElement, this.showClass);
//     this.renderer.removeClass(this.el.nativeElement, this.hideClass);
//   }

//   hide() {
//     this.renderer.addClass(this.el.nativeElement, this.hideClass);
//     this.renderer.removeClass(this.el.nativeElement, this.showClass);
//   }
// }

import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  Renderer2,
  HostBinding,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

@Directive({
  selector: '[appScrollRightSlide]',
  standalone: true,
})
export class ScrollSlideRightDirective implements OnInit, OnDestroy {
  @HostBinding('style.opacity') opacity = '0'; // Initial opacity
  @HostBinding('style.transform') transform = 'translateX(100%)'; // Initial position

  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Only run this in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initializeObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.showElement();
        } else {
          this.hideElement();
        }
      });
    });

    this.observer.observe(this.el.nativeElement);
  }

  private showElement(): void {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0)');
  }

  private hideElement(): void {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      'translateX(100%)'
    );
  }
}
