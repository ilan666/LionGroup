import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
})
export class AppComponent implements OnInit {
  title = 'LionGroup Co.';

  isBrowser: boolean;

  constructor(private router: Router) {}
  ngOnInit(): void {
    if (this.isBrowser) {
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
}
