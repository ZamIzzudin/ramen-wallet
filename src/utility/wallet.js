/** @format */
import { Buffer } from "buffer";
import { ec } from "elliptic";
import ecc from "@bitcoinerlab/secp256k1";
import BIP32Factory from "bip32";
import * as bip39 from "bip39";

import indexedDB from "./indexedDB";
import { encrypt, decrypt } from "./crypto";

window.Buffer = window.Buffer || Buffer;

export default (() => {
  const EC = new ec("secp256k1");
  const bip32 = BIP32Factory(ecc);

  async function generateWallet() {
    const mnemonic = bip39.generateMnemonic(128);

    const seed = await bip39.mnemonicToSeed(mnemonic);

    const root = bip32.fromSeed(seed);
    const child = root.derivePath("m/44'/0'/0'/0/0");

    const privateKey = child.privateKey.toString("hex");

    const wallet = EC.keyFromPrivate(privateKey);

    return {
      seed_phrase: mnemonic,
      public_key: wallet.getPublic("hex"),
      wallet,
    };
  }

  async function importWallet(seed_phrase) {
    const seed = await bip39.mnemonicToSeed(seed_phrase);

    const root = bip32.fromSeed(seed);
    const child = root.derivePath("m/44'/0'/0'/0/0");

    const privateKey = child.privateKey.toString("hex");

    const wallet = EC.keyFromPrivate(privateKey);

    return {
      public_key: wallet.getPublic("hex"),
      wallet,
    };
  }

  function saveWallet(wallet, password) {
    const key = wallet.getPrivate("hex");
    const encrypted = encrypt(key, password);

    try {
      indexedDB.editData({ token: encrypted, is_login: true });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function loadWallet(password) {
    const data = await indexedDB.getData();
    if (data.token) {
      const key = decrypt(data.token, password);
      indexedDB.editData({ is_login: true });

      return EC.keyFromPrivate(key);
    } else {
      console.error("Token not Found");
      return false;
    }
  }

  return {
    generateWallet,
    importWallet,
    saveWallet,
    loadWallet,
  };
})();
