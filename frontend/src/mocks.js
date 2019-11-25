export const mockProfileInfo = {
  email: 'test@fake.com',
  firstName: 'Fake',
  lastName: 'Name',
  phoneNumber: '123456',
  dob: '123',
  address: '123',
  age: '18',
  location: 'test',
  ethnicity: 'test',
  numRoommates: 3,
  priceLow: 2000,
  priceHigh: 9000,
};

export const mockPosts = [
  {
    name: 'Eric Ong',
    date: 'November 13, 2019',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    tags: ['tag1', 'tag2'],
    images: [
      'https://firebasestorage.googleapis.com/v0/b/cs180profilepictures.appspot.com/o/Eric%20Ong11%2F13%2F20190?alt=media',
      'https://firebasestorage.googleapis.com/v0/b/cs180profilepictures.appspot.com/o/Eric%20Ong11%2F13%2F20190?alt=media',
    ],
    numLikes: 1,
    numDislikes: 1,
    poster_email: 'eric4ong@gmail.com',
    posting_id: '1',
    liked: true,
    disliked: false,
    dislikedIds: ['4'],
    likedEmails: ['one@gmail.com'],
    dislikedEmails: [],
  },
  {
    name: 'Eric Ong',
    date: 'November 11, 2019',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    tags: [],
    images: [],
    numLikes: 1,
    numDislikes: 1,
    poster_email: 'eric4ong@gmail.com',
    posting_id: '2',
    liked: true,
    disliked: false,
    likedEmails: ['one@gmail.com'],
    dislikedEmails: ['two@gmail.com'],
  },
  {
    name: 'Eric Ong',
    date: 'November 12, 2019',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    tags: ['tag1', 'tag2'],
    images: [],
    numLikes: 1,
    numDislikes: 1,
    poster_email: 'eric4ong@gmail.com',
    posting_id: '3',
    liked: true,
    disliked: false,
    likedEmails: ['three@gmail.com'],
    dislikedEmails: [],
  },
  {
    name: 'Eric Ong',
    date: 'November 09, 2019',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    tags: ['tag1', 'tag2', 'tag4', 'tag5'],
    images: [],
    numLikes: 1,
    numDislikes: 1,
    poster_email: 'eric4ong@gmail.com',
    posting_id: '4',
    liked: true,
    disliked: false,
    likedEmails: [],
    dislikedEmails: ['four@gmail.com'],
  },
  {
    name: 'Eric Ong',
    date: 'November 16, 2019',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    tags: ['tag1'],
    images: [],
    numLikes: 1,
    numDislikes: 1,
    poster_email: 'eric4ong@gmail.com',
    posting_id: '5',
    liked: true,
    disliked: false,
    likedEmails: [],
    dislikedEmails: ['five@gmail.com'],
  },
];
export const mockLikedIds = ['1', '2', '3'];
export const mockDislikedIds = ['2', '4', '5'];
export const mockLocations = [
  'San Francisco',
  'New York',
  'Seattle',
  'Riverside',
  'Los Angeles',
];
export const mockPriceRange = [200, 8000];

export const mockMyReviews = [
  {
    name: "Francisco Lagos Vilaboa",
    person_who_was_rated_email: "flagosvilaboa@gmail.com",
    rater_email: "ericong18@gmail.com",
    num_stars: 4,
    date: "2019-11-22 20:10:43",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Francisco Lagos Vilaboa",
    person_who_was_rated_email: "flagosvilaboa@gmail.com",
    rater_email: "ericong18@gmail.com",
    num_stars: 2,
    date: "2019-11-21 20:10:43",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Francisco Lagos Vilaboa",
    person_who_was_rated_email: "flagosvilaboa@gmail.com",
    rater_email: "ericong18@gmail.com",
    num_stars: 4,
    date: "2019-11-14 20:10:43",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }
];

export const mockOtherReviews = [
  {
    name: "Eric Ong",
    person_who_was_rated_email: "flagosvilaboa@gmail.com",
    rater_email: "ericong18@gmail.com",
    num_stars: 4,
    date: "2019-11-18 20:10:43",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Eric Ong",
    person_who_was_rated_email: "flagosvilaboa@gmail.com",
    rater_email: "ericong18@gmail.com",
    num_stars: 2,
    date: "2019-11-21 20:10:43",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Eric Ong",
    person_who_was_rated_email: "flagosvilaboa@gmail.com",
    rater_email: "ericong18@gmail.com",
    num_stars: 4,
    date: "2019-11-14 20:10:43",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }
];