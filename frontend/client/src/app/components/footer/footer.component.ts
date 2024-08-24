import { Component, OnInit } from '@angular/core';
import { ScrollOffsetDirective } from '../../directives/scrollOffset.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.scss',
    '../../directives/scrollVisible.directive.scss',
  ],
  standalone: true,
  imports: [CommonModule, ScrollOffsetDirective],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
