////////////////////////////////////////////////////
//GENERATE RANDOM DEFAULT AVATAR
const defaultAvatar = () => {
  let number = Math.trunc(Math.random() * 5) + 1;
  const public_id = `Default Avatars/avatar${number}`;
  const secure_url = `https://res.cloudinary.com/dtlj4q6a4/image/upload/v1724499151/Default%20Avatars/avatar${number}.png`;
  return { public_id, secure_url };
};

////////////////////////////////////////////
//GENERATE OPT * FORGOT PASSWORD
const generatedOTP = () => {};

export { defaultAvatar, generatedOTP };
