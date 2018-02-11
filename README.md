# vulnerable-website
A simple website simulating an unsafe forum, for demonstrating Cross-site scripting (XSS) vulnerabilities.
Contains dummy user login and let the user create and save post to a database.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed.
Make sure to start the MongoDB service before running the app.

```sh
git clone git@github.com:Avitack/vulnerable-website.git
cd vulnerable-website
npm install
npm start
```

Your app should now be running on [localhost:8888](http://localhost:8888/).

### Login: 
User: ```user1```

Password: ```pass```

## Built With

* [Node.js](http://nodejs.org/) with [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Bootstrap](https://getbootstrap.com/)

## Images
Login screen:
![login_screen](https://user-images.githubusercontent.com/6278614/36078503-7b4c48d4-0f77-11e8-9fc7-cc5a03d84b6e.png)
Create new post with Cross-site scripting payload:
![create_post_onerror](https://user-images.githubusercontent.com/6278614/36078517-d7302364-0f77-11e8-969a-a9e928847f14.png)
New post created and added to front page:
![post_created_home](https://user-images.githubusercontent.com/6278614/36078521-e96e6644-0f77-11e8-973f-a5eed972c127.png)
Opening newly created post executing Cross-site scripting attack:
![post_onerror](https://user-images.githubusercontent.com/6278614/36078531-0607a4f0-0f78-11e8-9a80-95364732d905.png)
