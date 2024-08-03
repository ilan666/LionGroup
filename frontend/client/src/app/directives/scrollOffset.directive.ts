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

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollEvent();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  private setupScrollEvent(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  private onScroll(): void {
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
}
