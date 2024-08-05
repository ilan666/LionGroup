import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ScrollVisibleDirective } from '../../directives/scrollVisible.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: ContactComponent }]),
    CommonModule,
    ScrollVisibleDirective,
  ],
  declarations: [ContactComponent],
})
export class ContactModule {}
