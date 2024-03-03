# CS-465 - Full Stack Development I
CS-465 Full Stack Development with MEAN

## Architecture
### Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
#### Express HTML
Express HTML was used for serving static files from the web server. Before files are transfered to the client, the templating/view engine [Handlebars](https://handlebarsjs.com/) processes given templating files (such as HTML), replacing marked content with requested data. Consider something like the meals section of the main Travlr Getaways web page. When a user requests to view this page, first meals stored on the server are fetched, forwarded to the templating engine with the corresponding HTML file for processing, and then forwarded/rendered to the client.
#### JavaScript
JavaScript is a programming language used primarily for defining the functionality of a web page. Although intended for front-end/client-side development (for a user's web browser), it has been heavily adopted for use on the server-side through the use of [Node.js](https://nodejs.org). This project used the "MEAN" technological stack for development, which consists of [MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [Angular](https://angular.io/) and [Node.js](https://nodejs.org). The question may arise why these four specific technologies were combined together to form this stack, and the reason is all of them are JavaScript based. This means that the same language is used throughout, allowing for more streamlined development.
#### Single-Page Application (SPA)
A Single-Page Application (SPA) differs from a traditional web app, in that it typically uses a single HTML file, dynamically swapping/replacing the contents of the page based on the given state. The [Angular](https://angular.io/) framework was used to develop an SPA for the administrative side of the Travlr Getaways application. An SPA introduces many benefits, the most significant of which being added responsiveness to the website. When switching to a "different page," the contents of the current page are dynamically replaced, which allows for smooth and seamless transitions to different parts of the app.

### Why did the backend use a NoSQL MongoDB database?
[MongoDB](https://www.mongodb.com/) differs from traditional SQL databases, in that it follows the NoSQL/non-relational model. It uses the concept of storing documents in collections versus tables with rows and columns. Use of MongoDB yields many benefits, especially when an application is being prototyped and the complete final structure has not been defined yet. As there are no pre-defined schemas, documents/data can essentially take on any "shape," without requiring an entire modification of the database.

## Functionality
### How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
JSON (or JavaScript Object Notation) is useful for storing data in a key/value pair format. It it commonly used with the implementation of REST APIs, and was used in this project as well. Using JSON ties the front and backend together, considering MongoDB stores documents essentially in JSON format, and requests/responses are fulfilled using JSON as the format of data. Further, JSON data can be easily converted into literal JavaScript objects, for operations and more.
### Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.


## Testing
### Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

## Reflection
### How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?
