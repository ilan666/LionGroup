import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { ScrollVisibleDirective } from '../../directives/scrollVisible.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: AboutComponent }]),
    CommonModule,
    ScrollVisibleDirective,
  ],
  declarations: [AboutComponent],
})
export class AboutModule {}
