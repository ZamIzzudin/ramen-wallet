/** @format */

import { DEFAULT_INDEXED } from "../config";

export default (() => {
  const id = "ra-man-ext-configutation";

  let db;

  function initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("RaManDatabase", 1);

      request.onerror = (event) => {
        console.error("Error membuka database:", event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        db = event.target.result;
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        db = event.target.result;
        db.createObjectStore("data", {
          keyPath: "id",
        });
      };
    });
  }

  function addData(data) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["data"], "readwrite");
      const objectStore = transaction.objectStore("data");
      const request = objectStore.add({ ...DEFAULT_INDEXED, token: null, id });

      request.onerror = (event) => {
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }

  function editData(data) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["data"], "readwrite");
      const objectStore = transaction.objectStore("data");
      const request = objectStore.put({ ...DEFAULT_INDEXED, ...data, id });

      request.onerror = (event) => {
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }

  function removeData() {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["data"], "readwrite");
      const objectStore = transaction.objectStore("data");
      const request = objectStore.delete(id);

      request.onerror = (event) => {
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }

  function getData() {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["data"], "readonly");
      const objectStore = transaction.objectStore("data");
      const request = objectStore.get(id);

      request.onerror = (event) => {
        reject(event.target.error);
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
    });
  }

  return {
    initDB,
    addData,
    editData,
    removeData,
    getData,
  };
})();
