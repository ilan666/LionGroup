import { Routes } from '@angular/router';
import { TermsOfServiceComponent } from './components/terms/termsOfService.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'terms',
    loadChildren: () =>
      import('./components/terms/terms.module').then((m) => m.TermsModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./components/contact/contact.module').then(
        (m) => m.ContactModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./components/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      import('./components/portfolio/portfolio.module').then(
        (m) => m.PortfolioModule
      ),
  },
  {
    path: 'faqs',
    loadChildren: () =>
      import('./components/faqs/faqs.module').then((m) => m.FaqsModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
