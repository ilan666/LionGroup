import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollSlideLeftDirective } from '../../directives/scrollSlideLeft.directive';
import { ScrollVisibleDirective } from '../../directives/scrollVisible.directive';
import { ScrollOffsetDirective } from '../../directives/scrollOffset.directive';
import { RouterModule } from '@angular/router';
import { HorizontalScrollDirective } from '../../directives/horizontalScroll.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { ServiceCardsSectionComponent } from './service-cards-section/service-cards-section.component';
import { ScrollSectionComponent } from './scroll-section/scroll-section.component';
import { WebsitePanelsSectionComponent } from './website-panels-section/website-panels-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { ScrollSlideRightDirective } from '../../directives/scrollSlideRight.directive';
import { ContactWindowComponent } from '../contact-window/contact-window.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ScrollSlideLeftDirective,
    ScrollSlideRightDirective,
    ScrollVisibleDirective,
    ScrollOffsetDirective,
    HorizontalScrollDirective,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
  declarations: [
    HomeComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ServiceCardsSectionComponent,
    ScrollSectionComponent,
    WebsitePanelsSectionComponent,
    ContactSectionComponent,
    ContactWindowComponent,
  ],
})
export class HomeModule {}
