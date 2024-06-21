// CartUtils.js
export const generateUniqueCartId = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000000);
    const uniqueId = `${timestamp}_${randomNum}`;
    return uniqueId;
};
  