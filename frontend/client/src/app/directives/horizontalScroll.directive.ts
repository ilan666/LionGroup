import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHorizontalScroll]',
  standalone: true,
})
export class HorizontalScrollDirective {
  private currentSection = 0;
  private isScrolling = false;
  private sections: HTMLElement[];
  private readonly gapSize = 20; // Match this with the CSS gap/padding size

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.sections = Array.from(
      this.el.nativeElement.querySelectorAll('.slide-section')
    );
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    if (this.isScrolling) return;
    this.isScrolling = true;

    if (event.deltaY > 0 && this.currentSection < this.sections.length - 1) {
      this.currentSection++;
    } else if (event.deltaY < 0 && this.currentSection > 0) {
      this.currentSection--;
    }

    this.updateScroll();

    setTimeout(() => {
      this.isScrolling = false;
    }, 500);
  }

  private updateScroll() {
    const scrollContainer =
      this.el.nativeElement.querySelector('.scroll-sections');
    const sectionWidth = this.sections[0].offsetWidth;
    const scrollAmount = this.currentSection * (sectionWidth + this.gapSize);
    this.renderer.setStyle(
      scrollContainer,
      'transform',
      `translateX(-${scrollAmount}px)`
    );
  }
}
