import { message } from 'antd';

const BASE_URL = 'http://aa6dc42f.ngrok.io';
const inputIconColor = { color: 'rgba(0, 0, 0)' };
const PASSWORD_MATCH_ERROR = "Your passwords don't match!";
const EMPTY_INPUT_ERROR = "You left an input field empty!";
const PHONE_ERROR = "Your phone number is invalid.";

const showErrorMessage = text => message.error(text);

export {
  BASE_URL,
  inputIconColor,
  showErrorMessage,
  PASSWORD_MATCH_ERROR,
  EMPTY_INPUT_ERROR,
  PHONE_ERROR
};
