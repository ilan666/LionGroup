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
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollOffset]',
  standalone: true,
})
export class ScrollOffsetDirective implements OnInit, OnDestroy {
  private previousScrollY = 0; // Previous scroll position
  private translateY = 0; // Current translateY value for this element
  private isActive = false; // Whether the directive is active

  private boundOnScroll: () => void;
  private boundCheckScreenSizeAndToggleDirective: () => void;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.boundOnScroll = this.onScroll.bind(this);
    this.boundCheckScreenSizeAndToggleDirective =
      this.checkScreenSizeAndToggleDirective.bind(this);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // this.setupScrollEvent();
      this.checkScreenSizeAndToggleDirective();

      // Listen to window resize events
      window.addEventListener(
        'resize',
        this.checkScreenSizeAndToggleDirective.bind(this)
      );
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll.bind(this));
      window.removeEventListener(
        'resize',
        this.checkScreenSizeAndToggleDirective.bind(this)
      );
    }
  }

  private setupScrollEvent(): void {
    if (isPlatformBrowser(this.platformId) && this.isActive) {
      window.addEventListener('scroll', this.boundOnScroll);
    }
  }

  private onScroll(): void {
    if (!this.isActive) {
      return;
    }

    const currentScrollY = window.scrollY; // Current scroll position
    const index = Array.from(
      this.el.nativeElement.parentElement.children
    ).indexOf(this.el.nativeElement);

    // Calculate the direction
    if (currentScrollY > this.previousScrollY) {
      // Scrolling Down
      this.translateY = Math.min(this.translateY + 1, 20); // Increase translateY, max +20px
    } else {
      // Scrolling Up
      this.translateY = Math.max(this.translateY - 1, -20); // Decrease translateY, max -20px
    }

    // Apply the transform based on the index (even/odd)
    const baseOffset = index % 2 === 0 ? this.translateY : -this.translateY;

    // Update the element's transform style
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `translateY(${baseOffset}px)`
    );

    // Update previous scroll position
    this.previousScrollY = currentScrollY;
  }

  private checkScreenSizeAndToggleDirective(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth < 1024 && this.isActive) {
      this.isActive = false;
      window.removeEventListener('scroll', this.boundOnScroll);
      this.renderer.setStyle(this.el.nativeElement, 'transform', ''); // reset transform
    } else if (screenWidth >= 1024 && !this.isActive) {
      this.isActive = true;
      this.setupScrollEvent();
    }
  }
}
