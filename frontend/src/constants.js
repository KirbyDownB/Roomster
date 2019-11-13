import { message } from 'antd';

const BASE_URL = 'http://acb5d06d.ngrok.io';
const inputIconColor = { color: 'rgba(0, 0, 0)' };
const PASSWORD_MATCH_ERROR = "Your passwords don't match!";
const EMPTY_INPUT_ERROR = "You left an input field empty!";
const NO_IMAGE_ERROR = "You forgot to upload an image!";
const PHONE_ERROR = "Your phone number is invalid.";
const EMAIL_RESET_MESSAGE = "A password reset link has been sent to your email.";
const LOGIN_ERROR = "Sorry, we had trouble loggin you in!";
const GENERAL_ERROR = "Something went wrong!";
const durations = ["0 - 6 months", "6 months - 1 year", "1 year +"];
const ethnicities = [
  "American Indian or Alaska Native",
  "Asian",
  "Black or African-American",
  "Hispanic or Latino",
  "Native Hawaiian or Other Pacific Islander",
  "White"
];

const showErrorMessage = text => message.error(text);
const showSuccessMessage = text => message.success(text);
const dummyRequest = ({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0);

export {
  BASE_URL,
  inputIconColor,
  showErrorMessage,
  showSuccessMessage,
  PASSWORD_MATCH_ERROR,
  EMPTY_INPUT_ERROR,
  NO_IMAGE_ERROR,
  PHONE_ERROR,
  LOGIN_ERROR,
  EMAIL_RESET_MESSAGE,
  GENERAL_ERROR,
  durations,
  ethnicities,
  dummyRequest
};
