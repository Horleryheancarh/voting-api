export class BadRequestDto {
  url: 'POST /auth/register';
  message: 'Bad Request Exception';
  status: 400;
  errors: {
    statusCode: 400;
    message: '' | [];
    error: 'Bad Request';
  };
}

export class NotFoundDto {
  url: 'POST /auth/register';
  message: 'Bad Request Exception';
  status: 404;
  errors: {
    statusCode: 404;
    message: '' | [];
    error: 'Not Found';
  };
}

export class UnathorizedDto {
  url: 'POST /auth/register';
  message: 'Bad Request Exception';
  status: 401;
  errors: {
    statusCode: 401;
    message: '' | [];
    error: 'Unauthorized';
  };
}

export class ConflictDto {
  url: 'POST /auth/register';
  message: 'Conflict Exception';
  status: 400;
  errors: {
    statusCode: 400;
    message: '' | [];
    error: 'Conflict';
  };
}
