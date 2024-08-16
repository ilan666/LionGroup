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
  title = 'LionGroup Co.';
  currentRoute: string;

  previousScrollPosition = 0;

  isBrowser: boolean;

  public screenWidth: number;
  public screenHeight: number;

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
    if (this.isBrowser) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.scrollService.scrollToTop(); // Or use window.scrollTo(0, 0) directly here
        });

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.resetAnimations();
        });

      this.updateScreenSize();
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
      const navlinkcontainer = this.document.querySelectorAll(
        '.nav-link-container'
      ) as NodeListOf<HTMLElement>;
      const navlink = this.document.querySelectorAll(
        '.nav-link'
      ) as NodeListOf<HTMLElement>;
      const currentScrollPosition = window.pageYOffset;

      if (this.screenWidth < 768) {
        if (this.previousScrollPosition > currentScrollPosition) {
          navbar.style.transform = 'translateY(0px)';
        } else {
          navbar.style.transform = 'translateY(-80px)';
        }
      } else if (this.screenWidth >= 768 && this.screenWidth < 992) {
        if (this.previousScrollPosition > currentScrollPosition) {
          navbar.style.transform = 'translateY(0px)';
        } else {
          navbar.style.transform = 'translateY(-80px)';
        }
      } else {
        if (this.previousScrollPosition > currentScrollPosition) {
          navlinkcontainer.forEach((link) => {
            link.style.paddingTop = '35px';
            link.style.paddingBottom = '35px';
          });

          navlink.forEach((link) => {
            link.style.paddingTop = '35px';
            link.style.paddingBottom = '35px';
            link.style.fontSize = '20px';
          });
        } else {
          navlinkcontainer.forEach((link) => {
            link.style.paddingTop = '20px';
            link.style.paddingBottom = '20px';
          });

          navlink.forEach((link) => {
            link.style.paddingTop = '20px';
            link.style.paddingBottom = '20px';
            link.style.fontSize = '16px';
          });
        }
      }

      this.previousScrollPosition = currentScrollPosition;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.isBrowser) {
      this.updateScreenSize();
    }
  }

  setCurrentRoute(route: string) {
    this.currentRoute = route;
  }

  private updateScreenSize() {
    if (this.isBrowser) {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    }
  }
}
