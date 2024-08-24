const sendResponse = (res, message, data, redirectURL) => {
  res.status(200).json({
    seccess: true,
    message: message,
    data: data,
    redirectURL: redirectURL,
  });
};

export default sendResponse;
