# Building Modular Angular Applications with Micro Frontends and Native Federation

Building large-scale applications can be challenging, especially with many features and teams. Micro Frontend Architecture helps by breaking the application into smaller, manageable parts. This allows you to deploy and update each part independently. In this guide, we'll show you how to set up an Angular Micro Frontend Application using Native Federation.

---

### **Table of Contents:**
1. [Setting Up Your Angular Workspace](#step-1-setting-up-your-angular-workspace)
2. [Generate Applications](#step-2-generate-applications)
3. [Native Federation Setup](#step-3-native-federation-setup)
4. [Configure Host (Shell) Application](#step-4-configure-host-shell-application)
5. [Configure Remote (Todo) Application](#step-5-configure-remote-todo-application)
6. [Adding Routes in Shell](#step-6-adding-routes-in-shell)
7. [Running the Applications](#step-7-running-the-applications)
8. [Updating Shell’s HTML](#step-8-updating-shells-html)
9. [Testing the Application](#step-9-testing-the-application)

---

### **Step 1: Setting Up Your Angular Workspace**

1. **Create a new Angular workspace without an application**:

    Open a terminal and run the following command:

    ```bash
    ng new my-mfe-app --create-application=false
    ```

    This will create a clean workspace where you can generate individual applications later.

---

### **Step 2: Generate Applications**

1. **Generate the Shell (host) and Todo (remote) applications**:

    Run these commands to create two applications:

    ```bash
    ng generate application shell --prefix app-shell
    ng generate application todos --prefix app-todos
    ng generate application users --prefix app-users
    ```

    - The `shell` application will act as the host.
    - The `todos` application will be a remote module.
    - The `users` application will be a remote module.

---

### **Step 3: Native Federation Setup**

1. **Install the Native Federation package**:

    In the terminal, run:

    ```bash
    npm i -D @angular-architects/native-federation
    ```

    Native Federation simplifies managing micro frontends by allowing dynamic imports and independent deployments for each application.

---

### **Step 4: Configure Host (Shell) Application**

1. **Set up the Shell application as a dynamic host**:

    Run this command to initialize the Shell as a host that can load remote applications:

    ```bash
    ng g @angular-architects/native-federation:init --project shell --port 4200 --type dynamic-host
    ```

    This sets up the Shell as a dynamic host that will fetch remote modules during runtime, running on port 4200.

---

### **Step 5: Configure Remote (Todos) Application**

1. **Set up the Todo application as a remote module**:

    Run the following command:

    ```bash
    ng g @angular-architects/native-federation:init --project todos --port 4201 --type remote
    ng g @angular-architects/native-federation:init --project users --port 4202 --type remote
    ```

    The Todo app will now be a remote module available on port 4201 and users on 4202. The Shell application will load these modules dynamically.

---

### **Step 6: Adding Routes in Shell**

1. **Generate a Home component in the Shell application**:

    Run this command to create a Home component:

    ```bash
    ng g c pages/home --inline-style --project shell
    ```

2. **Update the routing configuration**:

    Open `shell/src/app/app.routes.ts` and update it as follows:

    ```typescript
    import { Routes } from '@angular/router';
    import { loadRemoteModule } from '@angular-architects/native-federation';
    import { HomeComponent } from './pages/home/home.component';

    export const routes: Routes = [
        { path: '', component: HomeComponent },
        {
            path: 'todo',
            loadComponent: () =>
                loadRemoteModule('todo', './Component').then((m) => m.AppComponent),
        },
        {
            path: '**',
            component: HomeComponent,
        },
    ];
    ```

    **Explanation**:
    - The default route (`''`) loads the `HomeComponent`.
    - The `/todos` route dynamically loads the Todo remote module using `loadRemoteModule`.
    - A wildcard route (`**`) redirects any unknown paths to `HomeComponent`.

### **Step 7: Open projects/shell/public/federation.manifest.json**
and verify that the remote modules are listed as follows:
{
	"todos": "http://localhost:4201/remoteEntry.json",
	"users": "http://localhost:4202/remoteEntry.json"
}

---

### **Step 8: Running the Applications**

1. **Run both the Shell and Todo applications**:

    In two separate terminal windows, run the following commands:

    ```bash
    ng serve shell
    ng serve todos
    ng serve users
    ```

    - The Shell application will run on `http://localhost:4200`.
    - The Todos application will run on `http://localhost:4201`.
    - The Users application will run on `http://localhost:4202`.

---

### **Step 9: Updating Shell’s HTML**

1. **Update the Shell’s `app.component.html` to include navigation**:

    Open `shell/src/app/app.component.html` and add the following code:

    ```html
    <ul>
      <li><a routerLink="/">Shell</a></li>
      <li><a routerLink="/todo">Todo</a></li>
    </ul>
    <router-outlet></router-outlet>
    ```

    This will create navigation links between the Shell and Todos applications.

---

### **Step 10: Testing the Application**

1. **Test the setup**:

    - Open `http://localhost:4200` in your browser (where the Shell app is running).
    - You should see the "Shell" component.
    - Click the **Todo** link. It will dynamically load the Todo application.

---

By following these steps, you’ll have a fully functioning Angular micro frontend application, where the Shell application dynamically loads the Todo module. This architecture allows for modularity, scalability, and independent deployments—ideal for large-scale projects.



====
# Microfrontends in Angular

### 3 Different Ways to Create Angular Microfrontends

---

### 1. **Webpack Module Federation** (Not Recommended)
Webpack Module Federation allows multiple web applications (or microfrontends) to share code dynamically at runtime. It enables the independent deployment of microfrontends, allowing them to load parts of their code (or entire applications) from remote locations.

- **Pros**:
  - Enables code sharing and reduces duplication.
  - Works across different frameworks (React, Angular, etc.), making it suitable for heterogeneous environments.
  - Offers flexibility in how modules are loaded and shared.

- **Cons**:
  - Complex configuration and management across multiple teams.
  - Versioning and dependency conflicts can arise.
  - Still evolving, and may require deep knowledge of Webpack to implement correctly.
  - Not always optimal for Angular-specific projects due to its Webpack-centric nature.

> **Is it recommended?** Not always for Angular-only applications, as it can be more complicated to manage in a purely Angular context. Other solutions are more streamlined for Angular.

---

### 2. **Native Federation** (Recommended for Angular)
Native Federation is an Angular-specific solution for building microfrontends, introduced in Angular 13 with the `@angular-architects/module-federation` library. It's a more Angular-native approach to managing microfrontends.

- **Pros**:
  - Tailored for Angular, offering better integration with Angular’s ecosystem.
  - Simplified configuration and maintenance compared to Webpack Module Federation.
  - Automatic handling of Angular modules, services, and lazy loading, reducing boilerplate.
  - Great compatibility with Angular CLI and build system.

- **Cons**:
  - Tied to Angular, making it less suitable for heterogeneous environments compared to Webpack-based approaches.
  - Relatively new, so best practices are still evolving.

> **Is it recommended?** Yes, it's the most seamless and Angular-friendly solution for microfrontends in Angular-only projects.

---

### 3. **Nx Tools** (Recommended)
Nx is a powerful build system and monorepo tool that helps in building microfrontends by managing multiple Angular applications within a single repository. Nx’s tooling for module federation and project structuring simplifies the creation and management of microfrontends.

- **Pros**:
  - Excellent support for monorepos and code sharing across microfrontends.
  - Out-of-the-box support for Webpack Module Federation, reducing configuration complexity.
  - Built-in tools for testing, building, and deploying microfrontends.
  - Great for large teams or organizations with complex needs.
  - Integrates well with Angular, as well as other frameworks like React and Vue.

- **Cons**:
  - Requires adopting Nx, which has its own learning curve.
  - Best suited for larger teams working in monorepos or large-scale projects.

> **Is it recommended?** Yes, especially if you’re using a monorepo or need advanced tooling for managing microfrontends and shared libraries across multiple projects.

---

### Summary:

- **Webpack Module Federation**: Works for microfrontends, but can be complex for Angular, especially in a pure Angular context.
- **Native Federation**: Highly recommended for Angular-specific projects, offering a streamlined setup.
- **Nx**: Also highly recommended for larger teams or monorepo setups, providing powerful tools for managing microfrontends and shared libraries.

For most Angular-focused projects, **Native Federation** and **Nx** are the preferred approaches for creating microfrontends.



=====
