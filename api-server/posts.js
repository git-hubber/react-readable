const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Let\'s all learn React',
    body: 'Everyone says so after all.',
    author: 'Martin',
    category: 'react',
    voteScore: 3,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'Sharon',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  },
  "e3d674f6e9804af6b47522ec31d52b31": {
    id: 'e3d674f6e9804af6b47522ec31d52b31',
    timestamp: 1511745212000,
    title: 'Why should you learn Redux with React?',
    body: 'Lets talk about redux. The javascript library, just to be clear.',
    author: 'Martin',
    category: 'redux',
    voteScore: 0,
    deleted: false
  },
  "ff01e3eb4b2442afa729b09b7111fd83": {
    id: 'ff01e3eb4b2442afa729b09b7111fd83',
    timestamp: 1511658812000,
    title: 'My thoughts about React JS',
    body: 'I think React JS is the way of the future - for now, until the next best thing comes aloing.',
    author: 'Sharon',
    category: 'react',
    voteScore: 18,
    deleted: false
  },
  "9f4ec8394a094435a18e24a92a7734e2": {
    id: '9f4ec8394a094435a18e24a92a7734e2',
    timestamp: 1511586992000,
    title: 'So you want to learn tech?',
    body: 'Well Udacity may be the best place to do so, also Udemy is pretty cool too.',
    author: 'Marty',
    category: 'udacity',
    voteScore: 22,
    deleted: false
  },
  "cca7b14766e440f5a8834d48d097f9b0": {
    id: 'cca7b14766e440f5a8834d48d097f9b0',
    timestamp: 1511352672000,
    title: 'React Meetups',
    body: 'If you want to expand your React horizons, then a Meetup is a great idea.',
    author: 'Martin',
    category: 'react',
    voteScore: 12,
    deleted: false
  },
  "6be1e15ae6c24d0d8a0b8150195830ea": {
    id: '6be1e15ae6c24d0d8a0b8150195830ea',
    timestamp: 1511203198000,
    title: 'Learning Online',
    body: 'Learning online can be fun at Udacity',
    author: 'Sharon',
    category: 'udacity',
    voteScore: 3,
    deleted: false
  },
  "e2230cb858bf4e8cbf7c4447fb7a4a3c": {
    id: 'e2230cb858bf4e8cbf7c4447fb7a4a3c',
    timestamp: 1510860771000,
    title: 'React vs Angular? ',
    body: 'Easy ..... React all the way! ',
    author: 'Martin',
    category: 'react',
    voteScore: -1,
    deleted: false
  },
  "a13b0f3122074da0b3291e10d6f7d9f8": {
    id: 'a13b0f3122074da0b3291e10d6f7d9f8',
    timestamp: 1510531005000,
    title: 'React and Apps',
    body: 'Using familiar concepts from React you can build Apps with React Native, it\'s easy as.....',
    author: 'Martin',
    category: 'react',
    voteScore: 17,
    deleted: false
  },
  "174910b35c25447fac9ad857f24826f0": {
    id: '174910b35c25447fac9ad857f24826f0',
    timestamp: 1510492455000,
    title: 'My reaction to React',
    body: 'I was very impressed with it!',
    author: 'Sharon',
    category: 'react',
    voteScore: 9,
    deleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
