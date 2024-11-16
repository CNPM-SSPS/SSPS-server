import httpStatus from 'http-status';

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong');
};

export default globalErrorHandler;
