import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ScrollOffsetDirective } from '../../directives/scrollOffset.directive';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, ScrollOffsetDirective, RouterModule],
})
export class NavbarComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private scrollService: ScrollService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.previousScrollPosition = window.pageYOffset;
    }
  }

  currentRoute: string;
  previousScrollPosition = 0;
  isBrowser: boolean;
  public screenWidth: number;
  public screenHeight: number;

  ngOnInit() {
    if (this.isBrowser) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.scrollService.scrollToTop(); // Or use window.scrollTo(0, 0) directly here
        });
    }
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
