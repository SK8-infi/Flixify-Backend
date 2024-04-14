# Flixify
A complex backend project that is built with nodejs, expressjs, mongodb, mongoose, jwt, bcrypt, and many more. This project is a complete backend project that has all the features that a backend project should have. I tried to build a complete video hosting website similar to youtube with all the features like login, signup, upload video, like, unlike, comment, subscribe, unsubscribe, and many more.

Project uses all standard practices like JWT, bcrypt, access tokens, refresh Tokens and many more.

Services used for storing the data- mongoDB and Cloudinary




## API Reference

#### For Users

#### Base URL: `/api/v1/users`

| Endpoint               | Method | Description                                |
| :--------------------- | :----- | :----------------------------------------- |
| `/register`            | `POST` | Registers a new user.                      |
| `/login`               | `POST` | Logs in a user.                            |
| `/logout`              | `POST` | Logs out a user.                           |
| `/change-password`     | `POST` | Changes the password for the user.         |
| `/refresh-token`       | `POST` | Generates a new refresh token for the user.|
| `/current-user`        | `GET`  | Gets the current user.                     |
| `/watch-history`       | `GET`  | Gets the watch history of the current user.|
| `/channel/:username`   | `GET`  | Returns the user's channel profile.        |
| `/avatar`              | `PATCH`| Updates the avatar of the user.            |
| `/cover-image`         | `PATCH`| Updates the cover image of the user.       |
| `/update-account-details` | `PATCH`| Updates the account details of the user.   |


### For Videos

#### Base URL: `/api/v1/videos`

| Endpoint                           | Method   | Description                                       |
| :--------------------------------- | :------- | :------------------------------------------------ |
| `/publish-video`                   | `POST`   | Uploads a new video.                             |
| `/update-video/:videoId`           | `POST`   | Updates video details (title, description, and thumbnail) for the specified video ID. |
| `/toggle-publish-status/:videoId`  | `POST`   | Toggles the publish status of a video.           |
| `/get-all-videos`                  | `GET`    | Fetches all videos of the user.                  |
| `/:videoId`                        | `GET`    | Fetches the video by video ID.                   |
| `/delete-video/:videoId`           | `DELETE` | Deletes the video specified by the video ID.     |


### For Tweets

#### Base URL: `/api/v1/tweets`

| Endpoint              | Method   | Description                            |
| :-------------------- | :------- | :------------------------------------- |
| `/`                   | `POST`   | Creates a new tweet.                   |
| `/user/:userId`       | `GET`    | Retrieves tweets for a specific user. |
| `/:tweetId`           | `GET`    | Retrieves the tweet by tweet ID.       |
| `/:tweetId`           | `DELETE` | Deletes the tweet specified by the tweet ID. |


#### Base URL: `/api/v1/playlist`

| Endpoint                          | Method   | Description                                          |
| :-------------------------------- | :------- | :--------------------------------------------------- |
| `/:playlistId`                    | `GET`    | Fetches the playlist by playlist ID.                 |
| `/:playlistId`                    | `PATCH`  | Updates the playlist specified by the playlist ID.   |
| `/:playlistId`                    | `DELETE` | Deletes the playlist specified by the playlist ID.   |
| `/add/:videoId/:playlistId`       | `PATCH`  | Adds a video to the playlist specified by video ID and playlist ID. |
| `/remove/:videoId/:playlistId`    | `PATCH`  | Removes a video from the playlist specified by video ID and playlist ID. |
| `/user/:userId`                   | `GET`    | Retrieves playlists for a specific user.             |


#### Base URL: `/api/v1/comments`

| Endpoint              | Method   | Description                              |
| :-------------------- | :------- | :--------------------------------------- |
| `/:videoId`           | `GET`    | Retrieves comments for a specific video. |
| `/:videoId`           | `POST`   | Comments on a specific video.            |
| `/c/:commentId`       | `PATCH`  | Updates a comment specified by the comment ID. |
| `/c/:commentId`       | `DELETE` | Deletes a comment specified by the comment ID. |


#### Base URL: `/api/v1/likes`

| Endpoint                        | Method | Description                                          |
| :------------------------------ | :----- | :--------------------------------------------------- |
| `/toggle/v/:videoId`            | `POST` | Toggles the like status for a specific video.       |
| `/toggle/c/:commentId`          | `POST` | Toggles the like status for a specific comment.     |
| `/toggle/t/:tweetId`            | `POST` | Toggles the like status for a specific tweet.       |
| `/videos`                       | `GET`  | Retrieves the liked videos of the logged-in user.   |


#### Base URL: `/api/v1/subscriptions`

| Endpoint                  | Method | Description                                            |
| :------------------------ | :----- | :----------------------------------------------------- |
| `/c/:channelId`           | `GET`  | Retrieves subscribers for a specific channel.         |
| `/c/:channelId`           | `POST` | Toggles subscription status for a specific channel.   |
| `/u/:subscriberId`        | `GET`  | Retrieves subscribed channels for a specific user.    |


#### Base URL: `/api/v1/dashboard`

| Endpoint      | Method | Description                                |
| :------------ | :----- | :----------------------------------------- |
| `/stats`      | `GET`  | Retrieves channel statistics (logged in). |
| `/videos`     | `GET`  | Retrieves channel videos (logged in).     |


## Run Locally

Clone the project

```bash
 https://github.com/AdityaKrSingh26/Flixify-Backend.git
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Data Model
[Model](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)


## Documentation

[mongoose](https://mongoosejs.com/docs/guide.html)
[multer](https://www.npmjs.com/package/multer)
[jason web tokens](https://www.npmjs.com/package/jsonwebtoken)
[cloudinary](https://cloudinary.com/documentation/node_integration)
