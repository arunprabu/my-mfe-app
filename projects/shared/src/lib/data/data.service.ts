import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private dataSource = new BehaviorSubject<any>(null);
  data$ = this.dataSource.asObservable();

  updateData(newData: any) {
    console.log('2. Receiving the sample todo object in the shared service');
    console.log(newData);
    this.dataSource.next(newData);
    console.log('3. Emitting the sample todo object through the observable');
  }
}
