import { message } from 'antd';

export const BASE_URL = "http://f591a4e0.ngrok.io";
export const inputIconColor = { color: 'rgba(0, 0, 0)' };
export const PASSWORD_MATCH_ERROR = "Your passwords don't match!";
export const EMPTY_INPUT_ERROR = 'You left an input field empty!';
export const NO_IMAGE_ERROR = 'You forgot to upload an image!';
export const PHONE_ERROR = 'Your phone number is invalid.';
export const PROFILE_UPDATE_ERROR =
  'Sorry, we had an issue trying to update your profile.';
export const PROFILE_UPDATE_SUCCESS =
  'Your profile has been successfully updated.';
export const EMAIL_RESET_MESSAGE =
  'A password reset link has been sent to your email.';
export const SIGNUP_SUCCESS =
  "You've successfully signed up! You'll be redirected to the login page in 3 seconds";
export const NEW_POST_SUCCESS = 'Your post has successfully been submitted!';
export const NEW_POST_ERROR = "Sorry, we weren't able to submit your post!";
export const SIGNUP_ERROR = 'An issue occurred when trying to sign you up.';
export const LOGIN_ERROR = 'Sorry, we had trouble logging you in!';
export const GENERAL_ERROR = 'Something went wrong!';
export const NUM_IMAGE_UPLOAD_ERROR = 'Please upload no more than 5 images!';
export const FRIENDS_LIST_ERROR = "Sorry, we couldn't get your friends list.";
export const FRIENDS_REQUESTS_ERROR =
  "Sorry, we couldn't get your friend requests.";
export const ADD_FRIEND_ERROR =
  'Sorry, we had trouble adding your friend with that username';
export const ADD_FRIEND_ERROR_YOURSELF = 'Sorry, you cannot add yourself';
export const ADD_FRIEND_SUCCESS = "You've succesfully added that user";
export const SEARCH_FRIEND_ERROR = 'Please input a name before searching';
export const FEED_ERROR = 'Sorry, we had trouble loading your feed!';
export const FEED_SEARCH_ERROR = 'Sorry, we had trouble with searching!';
export const REACTION_ERROR =
  'An issue occurred when trying to record your reaction.';
export const FILTER_SUBMIT_ERROR =
  "Sorry, we couldn't submit your filter request.";
export const REVIEW_SUBMIT_ERROR =
  'Sorry, we had issues submitting your review.';
export const REVIEW_SUBMIT_SUCCESS = 'Thanks for submitting your review!';
export const MY_REVIEW_SELECTION = "My Reviews";
export const REVIEWS_ABOUT_ME_SELECTION = "Reviews About Me";
export const NO_REVIEWS = "Sorry, there currently aren't any reviews available.";
export const durations = ['0 - 6 months', '6 months - 1 year', '1 year +'];
export const defaultFilterMessages = {
  location: 'Select a location',
  ethnicity: 'Select an ethnicity',
  gender: 'Select a gender',
  duration: 'Select a duration',
};
export const ethnicities = [
  'American Indian or Alaska Native',
  'Asian',
  'Black or African-American',
  'Hispanic or Latino',
  'Native Hawaiian or Other Pacific Islander',
  'White',
];
export const occupations = [
  'Accountant',
  'Actor/Actress',
  'Architect',
  'Author',
  'Baker',
  'Carpenter',
  'Chef',
  'Cleaner',
  'Cook',
  'Dentist',
  'Designer',
  'Doctor',
  'Engineer',
  'Factory Worker',
  'Farmer',
  'Fire Fighter',
  'Fisherman',
  'Florist',
  'Gardener',
  'Journalist',
  'Judge',
  'Lawyer',
  'Lecturer',
  'Librarian',
  'Mechanic',
  'Model',
  'Nurse',
  'Pharmacist',
  'Photographer',
  'Pilot',
  'Politician',
  'Policeman/Policewoman',
  'Real Estate Agent',
  'Receptionist',
  'Scientist',
  'Secretary',
  'Soldier',
  'Student',
  'Taxi Driver',
  'Teacher',
  'Waiter/Waitress',
];
export const postTags = [
  'outdoors',
  'inspirational',
  'fun',
  'new beginnings',
  'happy',
  'searching',
];
export const genders = ['Male', 'Female', 'Other'];
export const sortOptions = ['Most Recent', 'Most Tags', 'Longest'];
export const reviewsSortOptions = ['Most Recent', 'Longest', 'Highest Rating'];

export const showErrorMessage = text => message.error(text);
export const showSuccessMessage = text => message.success(text);
export const dummyRequest = ({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0);
export const loginRedirect = () => window.location.href =  "/login";
