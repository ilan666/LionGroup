import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ScrollVisibleDirective } from './directives/scrollVisible.directive';
import { ScrollService } from './services/scroll.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ScrollVisibleDirective],
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
    './directives/scrollVisible.directive.css',
  ],
})
export class AppComponent implements OnInit {
  title = 'client';
  currentRoute: string;

  previousScrollPosition = 0;

  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private scrollService: ScrollService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.previousScrollPosition = window.pageYOffset;
    }
  }
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollService.scrollToTop(); // Or use window.scrollTo(0, 0) directly here
      });

    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.resetAnimations();
        });
    }
  }

  private resetAnimations(): void {
    const elements = document.querySelectorAll('[appScrollVisible]');
    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        // Reattach the directive logic here if needed
        element.dispatchEvent(new Event('resetAnimation'));
      }
    });
  }

  toggleNavbar() {
    const navLinks = document.querySelector('.nav-links') as HTMLElement;
    const burger = document.querySelector('.burger') as HTMLElement;
    navLinks.classList.toggle('active');
    burger.classList.toggle('burger-toggle');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.isBrowser) {
      const navbar = this.document.querySelector('.navbar') as HTMLElement;
      const currentScrollPosition = window.pageYOffset;

      if (this.previousScrollPosition > currentScrollPosition) {
        navbar.style.top = '0';
      } else {
        navbar.style.top = '-80px'; // adjust based on your navbar height
      }

      this.previousScrollPosition = currentScrollPosition;
    }
  }

  setCurrentRoute(route: string) {
    this.currentRoute = route;
  }
}
