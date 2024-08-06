import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqsComponent } from './faqs.component';
import { RouterModule } from '@angular/router';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PortfolioComponent }]),
  ],
  declarations: [FaqsComponent],
})
export class FaqsModule {}
