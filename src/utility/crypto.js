/** @format */

import CryptoJS from "crypto-js";
import { SHA256 } from "crypto-js";

const AES = CryptoJS.AES;
const ENC = CryptoJS.enc;

export function encrypt(data, key) {
  return AES.encrypt(data, key).toString();
}

export function decrypt(data, key) {
  return AES.decrypt(data, key).toString(ENC.Utf8);
}

export function hasherHex(value) {
  return SHA256(value).toString();
}
