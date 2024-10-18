/** @format */

export function addressPrettier(address, length = 6) {
  return `${address.slice(0, length)}...${address.slice(-4)}`;
}
