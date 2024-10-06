# social-network-api

## Description
 This is an application that serves as a backed to an (as yet be developed) social media application. It employs an Express.js back end, that also integrates a Mongo database as well as Mongoose in order to respond to various API queries.

## Table of contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

  ## Installation
This program requires the use of both Node and Express.js. Node.js will need to be installed, along with the both the Express and Mongoose packages.

Prior to starting the service, the underlying Mongo database needs to be created and seeded by running NPM RUN SEED

## Usage
As the application was developed using express.js, employing API end-points, the application will accept GET, POST and DELETE requests via API development tools which can supply the appropriately formed requests like Insomnia, Postman, etc.
- A GET request for http://localhost:3001/api/users will supply a JSON list of all users. Similarly a GET request for http://localhost:3001/api/users/:ID (where :ID is a user id) will return details for that particular user.
- A GET request for http://localhost:3001/api/thoughts will supply a JSON list of all thoughts. Similarly a GET request for http://localhost:3001/api/thoughts/:ID (where :ID is a thought id) will return details for that particular thought.
- A POST request for http://localhost:3001/api/users with along with JSON formatted with a body like { "username" : "jamesbond" } would create a new user
- A POST request for http://localhost:3001/api/thoughts with along with JSON formatted with a body like
{
    "thoughtText": "Shaken, not stirred",
    "username": "jamesbond"
}
would create a new thought along with bot its text as well as who created it.
- A PUT request for http://localhost:3001/api/users/:ID with along with a JSON formatted body like { "email" : "jamesbond@007.com" } would update an existing user with that particular ID
- A PUT request for http://localhost:3001/api/thoughts/:ID with along with a JSON formatted body like
{
    "thoughText" : "Not so much a problem solver. More so a problem eliminator",
}
would update an existing thought with that particular ID.
- A DELETE request for http://localhost:3001/api/users/:ID where :ID is a user id, will delete the item with the corresponding ID. This will also delete any assocated thoughts attached for the user.
- A DELETE request for http://localhost:3001/api/thought/:ID where :ID is a thought id, will delete the item with the corresponding ID.
- A POST request for http://localhost:3001/api/users/:userID/friends/:friendID, will add a friendID to the friends property for a given userID
- A DELETE request for http://localhost:3001/api/users/:userID/friends/:friendID, will remove (or unfriend) a friendID for the friends property for a given userID
- A POST request for http://localhost:3001/api/thoughts/:thoughtID/reactions, along with a JSON formatted body like
{
    "reactionBody": "What a delightful fellow",
    "username": "jamesbond"
}
would add a reaction to reaction property for a given thoughtID
- A DELETE request for http://localhost:3001/api/thoughts/:thoughtID/reactions/:reactionID, will remove a reactionID for a given thoughtID

A full video walkthrough, demonstrating the use of the backend using Insomnia can be found at:

[social media video]()

## Contributing
All backend express.js and Mongoose code was written or refactored from variously sourced code snippets by Warren Shan.
  
## License
None