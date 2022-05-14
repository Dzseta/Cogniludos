import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shape',
  template: `
    <img mat-card-image src={{value}} alt="Alakzat">
  `,
  styles: [
    `
    img {
      width: 100%;
      height: 100%;
      margin: auto;
    }
    `
  ]
})
export class ShapeComponent {

  @Input() value: any;

}
