import { Component } from '@angular/core';
import { ButtonComponent } from "../../../../../ui-component-lib/src/lib/button/button.component";
import { AppComponent } from "../../../../../users/src/app/app.component";
import { DataService } from '../../../../../shared/src';
import { SharedModule } from '../../../../../shared/src/lib/shared.module';

@Component({
  selector: 'app-shell-home',
  standalone: true,
  imports: [ButtonComponent, SharedModule],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  constructor(private dataService: DataService) {}

  handleSendSampleData() {
    const newData = { item: 'Apple' };
    console.log('1. Sending one sample object to the shared service');
    this.dataService.updateData(newData); // Update data
  }
}
