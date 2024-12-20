import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../../ui-component-lib/src';
import { DataService } from '../../../shared/src';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todos-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todos';
}
