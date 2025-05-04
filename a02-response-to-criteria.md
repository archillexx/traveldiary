# IFN666_25se1 Assessment 02 Submission

**Student name:**  Ashwin Suresh

**Student ID:** n12113395 

# Response to marking criteria

## (API) Core: Application architecture (1 mark)

- **One line description:** layered architecture: controllers, models, middleware, routes
- **Video timestamp:** 4:40
- **Relevant files**
   - /server/src/

## (API) Core: Endpoints (2 marks)

- **One line description:** endpoints for Task and Category (5 each); login and register
- **Video timestamp:** 3:30
- **Relevant files**
   - /server/src/routes/
   - TravelDiary.postman_collection

## (API) Core: Data model (3 marks)

- **One line description:** Entities: Task, Category, User
- **Video timestamp:** 9:10
- **Relevant files**
   - /server/src/models/user.js
   - /server/src/models/category.js
   - /server/src/models/destiantion.js

## (API) Core: Data interface (3 marks)

- **One line description:** Controllers: category, user, destination, auth, saved
- **Video timestamp:** 5:30
- **Relevant files**
   - /server/controllers/authController.js
   - /server/controllers/categoryController.js
   - /server/controllers/destiantionController.js
  

## (API) Core: Deployment to web server (3 marks)

- **One line description:** using Caddy for reverse-proxy and systemd for auto-start. available at n12113395.ifn666.com/traveldiary/ (frontend) and n12113395.ifn666.com/traveldiary/api (REST API); systemd launches the server.js node process
- **Video timestamp:** 8:10
- **Relevant files**
   - Caddyfile

## (API) Core: API testing with Postman (3 marks)

- **One line description:** used Postman. every endpoint has sample payloads. used URL and env variables.
- **Video timestamp:**  2:35
- **Relevant files**
   - TravelDiary.postman_collection

## (API) Additional: Authentication (3 marks)

- **One line description:** implemented using JWT. routes are protected
- **Video timestamp:** 6:20
- **Relevant files**
   - /server/src/routes/
   - /server/src/middleware/authMiddleware.js
   - /server/src/controllers/authController.js


## (API) Additional: Rate limiting (3 marks)

- **One line description:** logged in users get 10 queries per second; everyone else 5 queries per second
- **Video timestamp:** 4:20
- **Relevant files**
   - /server/src/server.js


## (API) Additional: Pagination (3 marks)

- **One line description:** get all tasks has pagination
- **Video timestamp:** 0:50, 5:45
- **Relevant files**
   - /server/src/controllers/destinationController.js


## (API) Additional: Use of third-party APIs (3 marks)

- **One line description:**  
  Integrated the OpenStreetMap API to visually display interactive markers for user-added travel destinations on a world map.

- **Video timestamp:**  
  00:02:35 – Demonstration of interactive map with destination markers.

- **Relevant files**
   - `client/src/components/Map.jsx`
   - `client/src/pages/Destination.jsx`






---


## (Client) Core: Application architecture (3 marks)

- **One line description:** two main dirs: components (having task/ and category/) and pages
- **Video timestamp:** 6:35
- **Relevant files**
   - /client/src/pages/ for main pages
   - /client/src/components/ for bespoke travel diary components

## (Client) Core: User interface design (3 marks)

- **One line description:** simple interface using Mantine components
- **Video timestamp:** from 00:00 for two minutes
- **Relevant files**
   - /client/src/pages/ for main pages
   - /client/src/components/ for bespoke travel diary components

## (Client) Core: React components (3 marks)

- **One line description:** components for DestinationCard,Add Destination, Login, Signup, Navbar, CategoryCards, Hero and Map

- **Video timestamp:** demo at 1:20 for create/edit task; 1:35 for create/edit category. source code from 7:00
- **Relevant files**
   - /client/src/components/

## (Client) Core: State management (3 marks)

- **One line description:** extensive use of useState
- **Video timestamp:**  8:50
- **Relevant files**
   - a good example is /client/src/components/AddDestiantion.jsx

## (Client) Core: API integration (3 marks)

- **One line description:** integrated with REST API. nearly all features (except query filtering) were matched at the frontend.
- **Video timestamp:** all throughout video
- **Relevant files**
   - /client/src/components/AddDestination.jsx
   - /client/src/components/AddCategory.jsx
   - /client/src/pages/Destination.jsx
   - /client/src/pages/Home.jsx
    - /client/src/pages/Saved.jsx

## (Client) Additional: Authentication (3 marks)

- **One line description:** via JWT workflow with REST API.
- **Video timestamp:** from 0:00 in the client demo
- **Relevant files**
   - /client/src/components/Login.jsx


## (Client) Additional: Rate limiting (3 marks)

- **One line description:** 
- **Video timestamp:** 
- **Relevant files**
   - /client/src/pages/Saved.jsx


## (Client) Additional: Pagination (3 marks)

- **One line description:** list of tasks is paginated (on the server side)
- **Video timestamp:** 0:50
- **Relevant files**
    - /client/src/pages/Destintion.jsx


## (Client) Additional: Responsive design (3 marks)

- **One line description:** 
- **Video timestamp:** 
- **Relevant files**
    - /client/src/pages/Destintion.jsx
   - /client/src/pages/Saved.jsx


