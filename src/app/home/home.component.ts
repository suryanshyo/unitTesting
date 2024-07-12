import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  sub(a: number, b: number) {
    return a - b;
  }
  
  add(a: number, b: number) {
    return a + b;
  }

  sub1(a: number, b: number) {
    return a - b;
  }

  sub2(a: number, b: number) {
    return a - b;
  }

  sub3(a: number, b: number) {
    return a - b;
  }
}
