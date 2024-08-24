import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-contact-window',
  templateUrl: './contact-window.component.html',
  styleUrls: [
    './contact-window.component.scss',
    '../../directives/scrollVisible.directive.scss',
  ],
})
export class ContactWindowComponent implements OnInit {
  @Input() openWindow: boolean = false;
  @Output() closeWindow = new EventEmitter<void>();

  onClose() {
    this.closeWindow.emit(); // Emit the close event
  }

  constructor() {}

  ngOnInit() {}
}
