import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [ngClass]="buttonClass" (click)="onClick()">
      <ng-content></ng-content>
    </button>
  `,
  styles: `button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      cursor: pointer;
    }`,
})
export class ButtonComponent {
  @Input() buttonClass: string = 'btn-primary';

  onClick() {
    console.log('Button clicked');
  }
}
