const username = "USERNAME_HERE";
const depth = 1;

const recursive_delay = function(_remaining_depth) {
  let min = 3000; // 3 sec
  let max = 12000; // 12 sec
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/** guess what this does... */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** searches for a username and returns the top result. */
async function fetch_user(username) {
  try {
    const user_query = await fetch(
      `https://www.instagram.com/web/search/topsearch/?query=${username}`
    );

    const query_json = await user_query.json();

    return query_json.users.map(u => u.user)
      .filter(
        u => u.username === username
      )[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}


/** recursively fetches users and their followers. */
async function fetch_followers(id, remaining_depth, followers) {
  if (remaining_depth <= 0) return followers;

  await sleep(recursive_delay(remaining_depth));

  let after = null;
  let next = true;

  while (next) {
    let json = await fetch(
      `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=` +
      encodeURIComponent(
        JSON.stringify({
          id: id,
          include_reel: true,
          fetch_mutual: true,
          first: 50,
          after: after,
        })
      )
    ).then((res) => res.json());

    let nodes = json.data.user.edge_followed_by.edges.map(({
      node
    }) => node);

    for (let node of nodes) {
      if (!followers.hasOwnProperty(node.username)) {
        followers[node.id] = {
          username: node.username,
          full_name: node.full_name,
          followers: null,
        };

        if (followers[id].followers === null) {
          followers[id].followers = [];
        }
        followers[id].followers.push(node.username);
        followers = await fetch_followers(node.id, remaining_depth - 1, followers);
      }
    };


    next = json.data.user.edge_followed_by.page_info.has_next_page;
    after = json.data.user.edge_followed_by.page_info.end_cursor;
  }
  return followers;
}

// followers[id] = { username: String, full_name: String, followers: Option<Vec<String>> }
let followers = {};

const user = await fetch_user(username);
followers[user.pk] = {
  username: username,
  full_name: user.full_name,
  followers: null,
};

(async () => {
  try {
    console.log(`give it a couple of seconds... probably hours...`);

    followers = await fetch_followers(user.pk, depth, followers);

    console.log({
      followers
    });

    console.log(
      `complete: type 'copy(followers)' in the console and paste it into a text editor to take a look at it'`
    );
  } catch (err) {
    console.log({
      err
    });
  }
})();
