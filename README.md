<h1>Social Media API Documentation</h1>
deploy link:-https://social-czg8.onrender.com/
<br>
<br>

<h2>Getting Started</h2>
<br>

<h3>To get started with the Social Media API, follow the steps below:</h3>
User Management
POST /register: Register a new user.
POST /login: Login user.
GET /users: Get All Users
POST /users/blacklist/:userId: Blacklist a user.
POST /users/unblacklist/:userId: Remove a user from the blacklist.
Post Management
POST /post: Create a new post.
PATCH /updatePost: Update an existing post.
DELETE /deletePost/:postId: Delete a post.
Following/Unfollowing Users
POST /follow/:userId: Follow a user.
POST /unfollow/:userId: Unfollow a user.
Feed Retrieval
GET /feed: Retrieve posts from users you follow.
GraphQL
To explore the API using GraphQL, you can access the GraphQL Playground at the following endpoint:

/graphql

Testing the API
You can test the API endpoints using tools like Postman or by sending requests directly from your application. Here's how you can test the endpoints:

Register a new user:

  POST http://localhost:8080/register
  Content-Type: application/json

  {
    "username": "exampleuser",
    "email": "user@example.com",
    "password": "password123"
  }
Login user:

    POST http://localhost:8080/login
    Content-Type: application/json

    {
      "email": "user@example.com",
      "password": "password123"
    }
      POST http://localhost:8080/post
  Authorization: Bearer &lt;token&gt;
  Content-Type: application/json

  {
    "content": "This is a new post."
  }
Update an existing post:

PATCH http://localhost:8080/updatePost
    Authorization: Bearer &lt;token&gt;
    Content-Type: application/json

    {
      "postId": "123456",
      "content": "Updated content for the post."
    }
Delete a post:

  DELETE http://localhost:8080/deletePost/:postId
  Authorization: Bearer <token>
  Content-Type: application/json

  {
    "postId": "12345"
  }
Follow a user:

POST http://localhost:8080/follow/:userId
        Authorization: Bearer &lt;token&gt;
Unfollow a user:

POST http://localhost:8080/unfollow/:userId
Authorization: Bearer &lt;token&gt;
