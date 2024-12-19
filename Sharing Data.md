Sharing data between two different Angular projects in a Micro Frontend architecture (such as the one you're setting up with Native Federation) typically involves using shared services, state management, or events that can communicate between the Host (Shell) and Remote (Todo) applications.

Here's how you can share data between the Shell and Todo applications:

1. Shared Service with Singleton Pattern
You can create a shared service that both the Host and Remote applications can consume. This service can be part of a shared library that both applications import. The service can be used to share data or manage application state across different modules.

Steps:
Create a Shared Library First, you can generate a shared library inside the workspace that both applications can use.

```
ng generate library shared
```
This will create a shared library where you can place shared services, models, or utilities.

Create a Shared Service Inside the shared library, create a service to manage shared data.

bash
Copy code
ng generate service shared/data --project shared
In this service, you can use RxJS subjects or BehaviorSubject to handle the shared data.

typescript
Copy code
// shared/src/lib/data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Make sure this service is provided at the root level
})
export class DataService {
  private dataSource = new BehaviorSubject<any>(null);
  data$ = this.dataSource.asObservable();

  updateData(newData: any) {
    this.dataSource.next(newData);
  }
}
The BehaviorSubject is a good choice because it can hold the current state and emit new values to any subscriber.
Import the Shared Service in Both Applications After creating the service, make sure to import the SharedModule into both the Host (Shell) and Remote (Todo) applications.

typescript
Copy code
// shell/src/app/app.module.ts
import { SharedModule } from 'shared';  // Import the shared module

@NgModule({
  declarations: [AppComponent],
  imports: [SharedModule],  // Import it here
  bootstrap: [AppComponent],
})
export class AppModule {}
Do the same for the Todo application.

typescript
Copy code
// todo/src/app/app.module.ts
import { SharedModule } from 'shared';  // Import the shared module

@NgModule({
  declarations: [AppComponent],
  imports: [SharedModule],  // Import it here as well
  bootstrap: [AppComponent],
})
export class AppModule {}
Using the Service to Share Data Now, you can use the service to share data. For example, in the Shell app, you can update the data:

typescript
Copy code
// shell/src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { DataService } from 'shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private dataService: DataService) {}

  updateTodoData() {
    const newData = { todo: 'New Todo Item' };
    this.dataService.updateData(newData);  // Update data
  }
}
In the Todo app, you can subscribe to the shared data:

typescript
Copy code
// todo/src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from 'shared';

@Component({
  selector: 'app-root',
  template: `<div>{{ todoData | json }}</div>`,
})
export class AppComponent implements OnInit {
  todoData: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.data$.subscribe((data) => {
      this.todoData = data;  // Update component with new data
    });
  }
}
Whenever the data is updated in the Shell application via updateData(), the Todo application will automatically receive the new data because they are both subscribing to the same BehaviorSubject from the shared service.

## 2. Using Custom Events via Window.postMessage (Cross-App Communication)
If you want to pass data between the Host and Remote applications when they are running in different windows or different tabs, you can use the window.postMessage API to communicate across different contexts (like if the Host and Remote apps are in separate browser windows).

Steps:
Sending Data (Host app) From the Shell (Host) app, use window.postMessage to send a message to the Todo (Remote) app.

typescript
Copy code
// shell/src/app/pages/home/home.component.ts
sendDataToTodo() {
  const data = { message: 'Data from Shell to Todo' };
  window.postMessage({ type: 'SHARED_DATA', payload: data }, '*');
}
Receiving Data (Todo app) In the Todo (Remote) app, you can listen for the postMessage event to receive data.

typescript
Copy code
// todo/src/app/app.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div>{{ todoData | json }}</div>`,
})
export class AppComponent implements OnInit {
  todoData: any;

  ngOnInit() {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'SHARED_DATA') {
        this.todoData = event.data.payload;  // Receive and handle data
      }
    });
  }
}

### 3. Using Local Storage or Session Storage
If the Host and Remote applications are loaded in separate browser contexts (tabs/windows), you could also use localStorage or sessionStorage to persist data across different windows.

Example:
The Shell app writes data to localStorage.

typescript
Copy code
// shell/src/app/pages/home/home.component.ts
saveDataToLocalStorage() {
  const data = { todo: 'Shared Todo Data' };
  localStorage.setItem('todoData', JSON.stringify(data));
}
The Todo app reads data from localStorage.

typescript
Copy code
// todo/src/app/app.component.ts
loadDataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('todoData') || '{}');
  this.todoData = data;
}


### 4. Using Shared State Management
If your project is more complex and requires advanced state sharing, you can integrate a state management library like NgRx or or NgXs or Akita. These libraries can manage shared state across both applications and provide more advanced mechanisms for dispatching and selecting state.

Conclusion
To share data between the Host (Shell) and Remote (Todo) applications in your Angular Micro Frontend setup, the most common approaches are:

Shared Services using BehaviorSubject or Subject for state management.
Custom Events using window.postMessage for cross-window communication.
Local Storage or Session Storage if the apps run in separate browser contexts.
State Management Libraries like NgRx for more complex scenarios.
Each approach depends on how your micro frontends are set up and how tightly they are integrated. For tighter integration, shared services are usually the simplest and most effective approach.