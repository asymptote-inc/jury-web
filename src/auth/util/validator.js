const validEmail = email => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const validUsername = username => {
  return /^\w{3,}$/.test(username);
};

const validPassword = password => {
  return password.length >= 1;
};

export { validEmail, validPassword, validUsername };
