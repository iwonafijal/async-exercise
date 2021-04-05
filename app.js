console.log("start");

function loginUser(email, password, callback) {
  setTimeout(() => {
    console.log("Now we have data");
    callback({ userEmail: email, pass: password });
  }, 5000);
}

function getUserVideo(email, callback) {
  setTimeout(() => {
    console.log(email);
    callback(["video1", "video2"]);
  }, 2000);
}

function videoDetails(video, callback) {
  setTimeout(() => {
    console.log(video);
    callback("title fo the videio");
  }, 2000);
}

const lol = loginUser("iwona@goomail.com", 1234, (user) => {
  console.log(user);
  getUserVideo(user.userEmail, (videos) => {
    console.log(videos);
    videoDetails(videos[0], (title) => {
      console.log(title);
    });
  });
});

console.log("Finish");

// Promise ***************

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("got the user");
    resolve({ user: "Baron" });
    reject(new Error("User not logged in"));
  }, 2000);
});

promise
  .then((user) => {
    console.log(user);
  })
  .catch((err) => console.log(err.message));

// Refactoring the first part ********************************

console.log("start");

function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Now we have the data");
      console.log(email);
      resolve({ userEmail: email, pass: password });
    }, 3000);
  });
}

function getUserVideo(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(email);
      resolve(["video1", "video2"]);
    }, 2000);
  });
}

function videoDetails(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(video);
      resolve("title fo the videio");
    }, 2000);
  });
}

loginUser("iwona@goomail.com", 1234)
  .then((user) => getUserVideo(user.userEmail))
  .then((videos) => videoDetails(videos[0]))
  .then((detail) => console.log(detail));

// ASYNC ********************************************

// try and catch - in case of error

async function displayUser() {
  try {
    const loggedUser = await loginUser("iwona@goomail.com", 1234);
    const videos = await getUserVideo(loggedUser.userEmail);
    const detail = await videoDetails(videos[0]);
    console.log(detail);
  } catch (err) {
    console.log("we could not get the videos");
  }
}

displayUser();

// when want to run at the same time *************************

const yt = new Promise((resolve) => {
  setTimeout(() => {
    console.log("getting stuff from yt");
    resolve({ videos: [1, 2, 3, 4, 5] });
  }, 2000);
});

const fb = new Promise((resolve) => {
  setTimeout(() => {
    console.log("getting stuff from fb");
    resolve({ user: "Name" });
  }, 2000);
});

Promise.all([yt, fb]).then((result) => console.log(result));
