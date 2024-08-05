import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfServiceComponent } from './termsOfService.component';
import { ScrollVisibleDirective } from '../../directives/scrollVisible.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: TermsOfServiceComponent }]),
    CommonModule,
    ScrollVisibleDirective,
  ],
  declarations: [TermsOfServiceComponent],
})
export class TermsModule {}
