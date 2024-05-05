const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const USERNAME_PATTERN = /^[a-zA-Z\-0-9]+$/;

const RA_PATTERN = /^\d+$/;

export { EMAIL_PATTERN, USERNAME_PATTERN, RA_PATTERN };
