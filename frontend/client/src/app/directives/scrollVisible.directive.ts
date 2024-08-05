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
  AfterViewInit,
  RendererFactory2,
} from '@angular/core';

@Directive({
  selector: '[appScrollVisible]',
  standalone: true,
})
export class ScrollVisibleDirective
  implements OnInit, OnDestroy, AfterViewInit
{
  @HostBinding('style.opacity') opacity = '0'; // Initial opacity
  @HostBinding('style.transform') transform = 'translateY(20px)'; // Initial position

  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  ngAfterViewInit(): void {
    // Only run this in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.hideElement(); // Hide element when view initializes
      this.initializeObserver(); // Reinitialize the observer
    }
  }

  ngOnInit(): void {
    // Only run this in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeObserver();
      this.showElement();
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
