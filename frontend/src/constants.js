import { message } from 'antd';

export const BASE_URL = "http://2b5018cd.ngrok.io";
export const inputIconColor = { color: 'rgba(0, 0, 0)' };
export const PASSWORD_MATCH_ERROR = "Your passwords don't match!";
export const EMPTY_INPUT_ERROR = "You left an input field empty!";
export const NO_IMAGE_ERROR = "You forgot to upload an image!";
export const PHONE_ERROR = "Your phone number is invalid.";
export const EMAIL_RESET_MESSAGE = "A password reset link has been sent to your email.";
export const SIGNUP_SUCCESS= "You've successfully signed up! You'll be redirected to the login page in 3 seconds";
export const NEW_POST_SUCCESS = "Your post has successfully been submitted!";
export const NEW_POST_ERROR = "Sorry, we weren't able to submit your post!";
export const SIGNUP_ERROR = "An issue occurred when trying to sign you up.";
export const LOGIN_ERROR = "Sorry, we had trouble logging you in!";
export const GENERAL_ERROR = "Something went wrong!";
export const NUM_IMAGE_UPLOAD_ERROR = "Please upload no more than 5 images!";
export const ADD_FRIEND_ERROR = "Sorry, we had trouble finding a user with that email";
export const FEED_ERROR = "Sorry, we had trouble loading your feed!";
export const FEED_SEARCH_ERROR = "Sorry, we had trouble with searching!";
export const REACTION_ERROR = "An issue occurred when trying to record your reaction.";
export const durations = ["0 - 6 months", "6 months - 1 year", "1 year +"];
export const ethnicities = [
  "American Indian or Alaska Native",
  "Asian",
  "Black or African-American",
  "Hispanic or Latino",
  "Native Hawaiian or Other Pacific Islander",
  "White"
];
export const occupations = [
  "Accountant",
  "Actor/Actress",
  "Architect",
  "Author",
  "Baker",
  "Carpenter",
  "Chef",
  "Cleaner",
  "Cook",
  "Dentist",
  "Designer",
  "Doctor",
  "Engineer",
  "Factory Worker",
  "Farmer",
  "Fire Fighter",
  "Fisherman",
  "Florist",
  "Gardener",
  "Journalist",
  "Judge",
  "Lawyer",
  "Lecturer",
  "Librarian",
  "Mechanic",
  "Model",
  "Nurse",
  "Pharmacist",
  "Photographer",
  "Pilot",
  "Politician",
  "Policeman/Policewoman",
  "Real Estate Agent",
  "Receptionist",
  "Scientist",
  "Secretary",
  "Soldier",
  "Student",
  "Taxi Driver",
  "Teacher",
  "Waiter/Waitress"
]
export const postTags = [
  "outdoors",
  "inspirational",
  "fun",
  "new beginnings",
  "happy",
  "searching"
]
export const genders = [
  "Male",
  "Female",
  "Other"
]

export const showErrorMessage = text => message.error(text);
export const showSuccessMessage = text => message.success(text);
export const dummyRequest = ({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0);
export const loginRedirect = () => window.location.href =  "/login";
