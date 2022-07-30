export const contractAddress = '0x0116CeA9062e976027399bd34B07e12e7Ad9D5Aa'

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};
