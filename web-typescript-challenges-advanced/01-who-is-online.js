

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

  for (const user of users) {
    if (user.status === "offline") {
      result.offline.push(user.username);
    } else if (user.status === "online") {
      if (user.lastActivity <= 10) {
        result.online.push(user.username);
      } else {
        result.away.push(user.username);
      }
    }
  }

  return result;
}

console.log(whosOnline(users));


// ~/Doc/G/web-bootcamp-advanced/web-challenges-advanced on main ?1 ❯ node who-is-online.js                                              at 10:36:40
// { online: [ 'David' ], offline: [ 'Lucy' ], away: [ 'Bob' ] }