import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServicesComponent } from './components/services/services.component';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
  currentRoute: string;

  previousScrollPosition = 0;

  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.previousScrollPosition = window.pageYOffset;
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
