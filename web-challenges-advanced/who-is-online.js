

// online: The user's status is "online" and their lastActivity is 10 minutes or less.
// away: The user's status is "online" but their lastActivity is greater than 10 minutes.
// offline: The user's status is "offline", regardless of their last activity.

// TEST DATA
const users = [
  {
    username: "David",
    status: "online",
    lastActivity: 10,
  },
  {
    username: "Lucy",
    status: "offline",
    lastActivity: 22,
  },
  {
    username: "Bob",
    status: "online",
    lastActivity: 25,
  },
];



function whosOnline(users) {

  // OUTPUT
  const result = {
    online: [],
    offline: [],
    away: [],
  };

  // process each object in an array.
  for (const user of users) {

    if (user.status === "offline") {
      result.offline.push(user.username);
      // console.log(user.username, "is offline");
    }

    if (user.status === "online" && user.lastActivity <= 10) {
       result.online.push(user.username);
      // console.log(user.username, "is online");
    }
    if (user.status === "online" && user.lastActivity > 10) {
        result.away.push(user.username);
      // console.log(user.username, "is away");
    }
  }

  return result
}
console.log(whosOnline(users));

// ~/Doc/G/web-bootcamp-advanced/web-challenges-advanced on main ?1 ❯ node who-is-online.js                                              at 10:36:40
// { online: [ 'David' ], offline: [ 'Lucy' ], away: [ 'Bob' ] }