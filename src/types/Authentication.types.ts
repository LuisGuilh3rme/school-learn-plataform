type SignProps = {
  email: string;
  password: string;
};

type CreateAccountProps = {
  ra: string;
  username: string;
} & SignProps;

export { SignProps, CreateAccountProps };
