import { v4 as uuid } from "uuid";

export const defaultUser = {
  id: uuid(),
  username: "username",
  name: "name",
  // profile_image:
  //   "https://scontent-ort2-2.cdninstagram.com/v/t51.2885-19/s150x150/82559664_3161307737426774_8687807477812559872_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com&_nc_ohc=llb3VCRb-mkAX_XTEi3&oh=64f0323db646c01299e513e3337b83ff&oe=5E8620BF"
  profile_image:
  "https://miro.medium.com/fit/c/131/131/1*JyYin7G7aGwgD9zpYBZ12Q.png"
};

export function getDefaultUser() {
  return {
    id: uuid(),
    username: "username",
    name: "name",
    profile_image:
      "https://miro.medium.com/fit/c/131/131/1*JyYin7G7aGwgD9zpYBZ12Q.png"
  };
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
  user: defaultUser,
  media:
    "https://images.unsplash.com/photo-1550399504-8953e1a6ac87?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
  comments: [],
  created_at: "2020-02-28T03:08:14.522421+00:00"
};

export function getDefaultPost() {
  return {
    id: uuid(),
    likes: 10,
    caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
    user: defaultUser,
    media:
      "https://miro.medium.com/max/1400/1*tFeMYvPcgSAhBxb7_OmiQg.png",
    comments: [],
    created_at: "2020-02-28T03:08:14.522421+00:00"
  };
}

export const defaultNotifications = [
  {
    id: uuid(),
    type: "follow",
    user: defaultUser,
    created_at: "2020-02-29T03:08:14.522421+00:00"
  },
  {
    id: uuid(),
    type: "like",
    user: defaultUser,
    post: defaultPost,
    created_at: "2020-02-29T03:08:14.522421+00:00"
  }
];

export const defaultCurrentUser = {
  id: uuid(),
  username: "me",
  name: "myself",
  profile_image:
    "https://miro.medium.com/fit/c/131/131/1*JyYin7G7aGwgD9zpYBZ12Q.png",
  website: "https://react12.io",
  email: "me@gmail.com",
  bio: "This is my bio",
  phone_number: "555-555-5555",
  posts: Array.from({ length: 10 }, () => getDefaultPost()),
  followers: [defaultUser],
  following: [defaultUser]
};
