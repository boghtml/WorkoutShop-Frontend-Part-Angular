<h1>Angular E-commerce Application</h1>

<h2>Table of Contents</h2>
<ol>
  <li><a href="#introduction">Introduction</a></li>
  <li><a href="#objectives">Objectives</a></li>
  <li><a href="#getting-started">Getting Started</a></li>
  <li><a href="#project-architecture">Project Architecture</a></li>
  <li><a href="#functionality">Functionality</a></li>
  <li><a href="#authentication-authorization">Authentication and Authorization</a></li>
  <li><a href="#api-integration">API Integration</a></li>
  <li><a href="#order-management">Order Management</a></li>
  <li><a href="#cart-management">Cart Management</a></li>
  <li><a href="#challenges-solutions">Challenges and Solutions</a></li>
  <li><a href="#conclusion">Results</a></li>
</ol>

<h2 id="introduction">1. Introduction</h2>
<p>
  This project is an Angular frontend application that interacts with a RESTful API developed in ASP.NET Core. The application provides functionalities for users including registration, authentication, viewing products, adding items to the cart, managing orders, and other operations.
</p>

<h2 id="objectives">2. Objectives</h2>
<ul>
  <li>Learn to work with the Angular framework.</li>
  <li>Develop a project using Web API on ASP.NET Core.</li>
</ul>

<h2 id="getting-started">3. Getting Started</h2>
<h3>3.1 Prerequisites</h3>
<ul>
  <li>Node.js and npm installed.</li>
  <li>Angular CLI installed globally.</li>
  <li>ASP.NET Core API running at <code>http://localhost:5276/api</code>.</li>
</ul>

<h3>3.2 Installation</h3>
<ol>
  <li>
    <strong>Creating a New Project:</strong>
    <p>
      Use Angular CLI to create a new project with standalone components for simplified architecture and reduced module dependencies.
    </p>
  </li>
  <li>
    <strong>Installing Dependencies:</strong>
    <p>
      Install required packages such as Angular Router, Forms, Material, Bootstrap, and RxJS using npm.
    </p>
  </li>
  <li>
    <strong>Configuring the Project:</strong>
    <p>
      Add Bootstrap for responsive design by including its CSS in the project's configuration. Import HttpClientModule to enable HTTP requests to the API.
    </p>
  </li>
</ol>

<h2 id="project-architecture">4. Project Architecture</h2>
<h3>4.1 Structure</h3>
<ul>
  <li><strong>Components:</strong> Responsible for the user interface.</li>
  <li><strong>Services:</strong> Handle logic for API interaction and state management.</li>
  <li><strong>Routing:</strong> Manages navigation between pages.</li>
  <li><strong>Interceptors:</strong> Add authorization headers to HTTP requests.</li>
  <li><strong>Guards:</strong> Protect routes for authenticated users.</li>
</ul>

<h3>4.2 Standalone Components</h3>
<p>
  Utilizing standalone components simplifies the project structure, reduces module dependencies, and enhances performance.
</p>

<h2 id="functionality">5. Functionality</h2>
<h3>5.1 Components</h3>
<ul>
  <li>
    <strong>HeaderComponent:</strong> Includes the navigation menu and is responsible for the application's header section.
  </li>
  <li>
    <strong>LoginComponent and RegisterComponent:</strong> Provide forms for user authentication and registration using reactive forms for data handling and validation.
  </li>
  <li>
    <strong>ProductsComponent and ProductDetailsComponent:</strong> Display a list of products with filtering and sorting options, and detailed information about selected products.
  </li>
  <li>
    <strong>CartComponent:</strong> Manages items added to the cart, allowing quantity updates and item removal.
  </li>
  <li>
    <strong>OrdersComponent and OrderDetailsComponent:</strong> Show the user's order history and details of specific orders.
  </li>
</ul>

<h3>5.2 Services</h3>
<ul>
  <li>
    <strong>AuthService:</strong> Manages user authentication, token storage, and authentication state.
  </li>
  <li>
    <strong>StorageService:</strong> Handles interactions with localStorage for data persistence.
  </li>
  <li>
    <strong>OrderService:</strong> Manages order-related API interactions, including creation and retrieval of orders.
  </li>
  <li>
    <strong>CartService:</strong> Handles cart operations like adding, updating, and removing items, and manages cart state using BehaviorSubject for real-time updates.
  </li>
</ul>

<h3>5.3 Routing</h3>
<p>
  Configured routing enables navigation between different pages, with route protection implemented through guards.
</p>

<h3>5.4 Route Protection with Guards</h3>
<p>
  <strong>AuthGuard</strong> ensures only authenticated users can access certain routes, redirecting unauthorized users to the login page.
</p>

<h3>5.5 HTTP Interceptors</h3>
<p>
  <strong>JwtInterceptor</strong> automatically adds JWT tokens to HTTP request headers for authenticated API calls.
</p>

<h3>5.6 Error Handling and Logging</h3>
<p>
  Global error handling mechanisms display user-friendly messages and log errors for debugging purposes.
</p>

<h3>5.7 State Management</h3>
<p>
  Services use <strong>BehaviorSubject</strong> to manage and share state across components, enabling reactive programming patterns.
</p>

<h2 id="authentication-authorization">6. Authentication and Authorization</h2>
<h3>6.1 User Registration and Login</h3>
<p>
  Users can create accounts and log in through dedicated forms. Upon successful authentication, JWT tokens are stored securely, and authentication state is maintained across sessions.
</p>

<h3>6.2 Protecting Routes</h3>
<p>
  Routes requiring authentication are guarded to prevent unauthorized access, enhancing the application's security.
</p>

<h2 id="api-integration">7. API Integration</h2>
<h3>7.1 Service-Based API Communication</h3>
<p>
  Services like <strong>OrderService</strong> and <strong>CartService</strong> communicate with the ASP.NET Core API using HttpClient, handling responses and errors effectively.
</p>

<h3>7.2 Real-Time Data Updates</h3>
<p>
  Components subscribe to service observables to receive real-time updates, ensuring the UI reflects the current state of data.
</p>

<h2 id="order-management">8. Order Management</h2>
<h3>8.1 Creating Orders</h3>
<p>
  Users can create new orders through the application, with order details stored and managed via the backend API.
</p>

<h3>8.2 Viewing Order Details</h3>
<p>
  Detailed information about individual orders, including product listings and statuses, is accessible to users.
</p>

<h2 id="cart-management">9. Cart Management</h2>
<h3>9.1 Adding Items to Cart</h3>
<p>
  Users can add products to their cart with specified quantities, with cart state managed both locally and via the API.
</p>

<h3>9.2 Updating and Removing Cart Items</h3>
<p>
  The application allows for updating item quantities and removing items from the cart, with changes reflected in real-time.
</p>


<h2 id="challenges-solutions">13. Challenges and Solutions</h2>
<h3>13.1 Token Management in HTTP Requests</h3>
<p>
  <strong>Challenge:</strong> Ensuring JWT tokens are included in all API requests.<br>
  <strong>Solution:</strong> Developed an HTTP interceptor to automatically append tokens to outgoing requests.
</p>

<h3>13.3 Route Protection and Authentication State</h3>
<p>
  <strong>Challenge:</strong> Unauthorized access to protected routes.<br>
  <strong>Solution:</strong> Employed route guards and managed authentication state using services to restrict access appropriately.
</p>

<h2 id="conclusion">Results</h2> 

![image](https://github.com/user-attachments/assets/50b46f97-2224-4f51-8679-64051a57390a)
![image](https://github.com/user-attachments/assets/e4ec46d6-175b-4a04-8e90-b5bf3f5a34f3)
![image](https://github.com/user-attachments/assets/7889f978-e68f-41d1-8a37-eff1b4b1f574)
