Building a component library for your Angular 18 app with micro frontends using native federation 
can be a great way to ensure that your shared UI components are reusable across the shell, 
todos, and users applications. 
Here’s a step-by-step guide to help you set up a component library and integrate it with your micro frontends:

1. Create the Component Library
Let's begin by creating a separate Angular library where you will store your reusable components.

Generate the Library First, navigate to your workspace and generate a new Angular library:

```
ng generate library bosch-ui-lib
```

This will create a new library inside your workspace, typically located at projects/bosch-ui-lib.

Create Reusable Components Inside the bosch-ui-lib project, you can start adding your reusable UI components. For example, let's create a button component:


ng generate component Button --project=bosch-ui-lib
This will create a button component inside the library. You can add styles, templates, and logic to this component.

Export Components In the bosch-ui-lib module, ensure that your components are exported so they can be used in other applications:

typescript

// projects/component-library/src/lib/bosch-ui-lib.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule],
  exports: [ButtonComponent],
})
export class ComponentLibraryModule {}

2. Enable Module Federation
To use native module federation for your micro frontends, you'll need to configure Webpack Module Federation in your projects (shell, todos, users).

Install Webpack 5 In Angular 18, Webpack 5 is supported out of the box, but you must make sure the configuration is enabled:

Install required dependencies:



npm install @angular-architects/module-federation --save-dev
Configure Webpack in the Shell App (Host)

In your shell app, set up module federation to expose the component library for other micro frontends (like todos and users):

Edit the Webpack config (webpack.config.js) in the shell app:

javascript

// webpack.config.js in shell app
module.exports = {
  name: 'shell',
  remotes: {
    todos: 'todos@http://localhost:4201/remoteEntry.js',
    users: 'users@http://localhost:4202/remoteEntry.js',
  },
  exposes: {
    './ComponentLibrary': './projects/component-library/src/public-api.ts',
  },
};
This makes your component-library available for consumption by other applications.

Configure Webpack in Todos and Users Apps (Remotes)

For each micro frontend (todos, users), you need to configure Webpack to consume the exposed component library:

javascript

// webpack.config.js in todos app
module.exports = {
  name: 'todos',
  remotes: {
    shell: 'shell@http://localhost:4200/remoteEntry.js',
  },
};
Do this for the users app as well, updating the remote entry URL accordingly.

3. Build and Serve
Now, you need to build and serve your applications.

Build the Component Library: To build the component library, run the following command:



ng build component-library
Build and Serve Shell App: Build the shell app with module federation support:



ng serve --configuration=production
Build and Serve Todos and Users: Similarly, serve the todos and users apps by running:



ng serve --configuration=production
Ensure that the todos and users applications are correctly importing and consuming the component-library exposed by the shell app.

4. Use the Component Library in Micro Frontends
In your todos and users apps, you can now import components from the shared component library (exposed by the shell) and use them directly.

For example, in the todos app, you can import and use the ButtonComponent from the shell:

typescript

import { ButtonComponent } from 'shell/ComponentLibrary';

@Component({
  selector: 'app-todo',
  template: `
    <app-button></app-button>
  `,
})
export class TodoComponent {}
5. Optimize and Configure for Production
For production builds, you’ll need to ensure that the component library is properly versioned and that caching and bundling strategies are optimized. You may also need to set up a CDN for better performance if you plan to host the components separately.

6. Optional: Use Nx for Better Monorepo Management
If you're managing your Angular apps in a monorepo and using Nx, it simplifies the configuration of micro frontends with better workspace management and additional tooling for module federation.

You can use the @nrwl/angular plugin for setting up micro frontends in an Nx workspace, which comes with an easy-to-use generator for module federation.



nx generate @nrwl/angular:host shell --mf
nx generate @nrwl/angular:remote todos --mf
nx generate @nrwl/angular:remote users --mf
7. Summary of Files to Modify:
Component Library (component-library):

Create and export shared components.
Export components in ComponentLibraryModule.
Shell App (Host):

Configure Webpack module federation in webpack.config.js to expose the component library.
Todos & Users Apps (Remotes):

Configure Webpack module federation in webpack.config.js to consume the shell's exposed components.
By following these steps, you can create a shared component library for your Angular 18 micro frontend application using native federation, ensuring modularity and reusability across your shell, todos, and users apps.