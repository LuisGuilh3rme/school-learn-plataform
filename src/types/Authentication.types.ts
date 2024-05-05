type SignProps = {
  email: string;
  password: string;
};

type CreateAccountProps = {
  username: string;
} & SignProps;

export { SignProps, CreateAccountProps };
