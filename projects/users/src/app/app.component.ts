import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../../../shared/src';
import { SharedModule } from '../../../shared/src/lib/shared.module';

@Component({
  selector: 'app-users-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'users';
  sampleData: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.data$.subscribe((data) => {
      console.log("4. Subscribing to the shared data observable");
      console.log(data);
      this.sampleData = data; // Update component with new data
    });
  }
}
