const generateCodeUser = (prefix, count) => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day}${month < 10 ? "0" + month : month}${year}`;

  return `${prefix}${formattedDate}${count}`;
};

export { generateCodeUser };
