import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ScrollSlideDirective } from '../../directives/scrollSlide.directive';
import { RouterModule } from '@angular/router';
import { ScrollVisibleDirective } from '../../directives/scrollVisible.directive';
import { ScrollOffsetDirective } from '../../directives/scrollOffset.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
    '../../directives/scrollSlide.directive.css',
    '../../directives/scrollVisible.directive.css',
  ],
})
export class HomeComponent implements OnInit {
  // users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.fetchUsers();
  }

  // fetchUsers() {
  //   this.http.get('http://127.0.0.1:5000/users').subscribe(
  //     (data: any) => {
  //       this.users = data;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
}
