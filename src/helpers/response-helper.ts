// create a helper function to handle the response
const responseHelper = (
  res: any,
  status: number,
  message?: string,
  data?: any,
) => {
  return res.status(status).json({
    success: status < 300 ? true : false,
    message,
    data,
  });
};

export default responseHelper;
