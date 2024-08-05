import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { ScrollSlideDirective } from '../../directives/scrollSlide.directive';
import { ScrollVisibleDirective } from '../../directives/scrollVisible.directive';
import { ScrollOffsetDirective } from '../../directives/scrollOffset.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ScrollSlideDirective,
    ScrollVisibleDirective,
    ScrollOffsetDirective,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
