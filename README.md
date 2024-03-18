<h1>Social Media API Documentation</h1>
deploy link:-https://social-czg8.onrender.com/


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Dummy Data for Testing](#dummy-data-for-testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
- git clone <repository_url>
2. Install dependencies:
  -npm install
3. Set up environment variables:
- Create a `.env` file in the root directory.
- Add the required environment variables (e.g., database connection string, secret keys).

## Usage

1. Start the server:
 -npm run server
2. Open Postman or any API testing tool.
3. Send requests to the provided endpoints (see [Endpoints](#endpoints)).

## Endpoints

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Login as a user and receive a JWT token.
- **POST /post/post**: Create a new post.
- **PATCH /post/updatePost**: Update an existing post.
- **DELETE/post /deletePost/:postId**: Delete a post by ID.
- **POST /follower/follow/:userId**: Follow a user.
- **POST /follower/unfollow/:userId**: Unfollow a user.
- **GET  /follower/feed**: Retrieve the user's feed.

## Dummy Data for Testing

### Registration (POST  /auth/register)
```json
{
"username": "testuser",
"email": "testuser@example.com",
"password": "password123"
}
###Login (POST /auth/login)
{
  "email": "testuser@example.com",
  "password": "password123"
}

**POST /post/post**: Create a new post.
{
  "content": "This is a test post content."
}
- **PATCH /post/updatePost**: Update an existing post.
{
  "postId": "6123456789abcdef01234567",
  "content": "Updated test post content."
}
Delete Post (DELETE /deletePost/:postId)
Replace :postId with the ID of the post you want to delete.

Follow User (POST /follow/:userId)
Replace :userId with the ID of the user you want to follow.

Unfollow User (POST /unfollow/:userId)
Replace :userId with the ID of the user you want to unfollow.

Get Feed (GET /feed)
No data required.

Contributing
Contributions are welcome! Feel free to open issues and pull requests.





