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
  selector: '[appScrollVisible]',
  standalone: true,
})
export class ScrollVisibleDirective implements OnInit, OnDestroy {
  @HostBinding('style.opacity') opacity = '0'; // Initial opacity
  @HostBinding('style.transform') transform = 'translateY(20px)'; // Initial position

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
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
  }

  private hideElement(): void {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      'translateY(20px)'
    );
  }
}
