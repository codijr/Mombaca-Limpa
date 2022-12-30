import EncryptedStorage from "react-native-encrypted-storage";

export async function setStorage(name: string, value: object) {
  await EncryptedStorage.setItem(name, JSON.stringify(value))
    .then(() => {
      console.log("Storage set");
    })
    .catch((error) => {
      console.log(`Storage set error: ${error}`);
    });
}

export async function getStorage(name: string) {
  await EncryptedStorage.getItem(name)
    .then((value) => {
      console.log(`Storage get: ${value}`);
      return value === null ? "" : JSON.parse(value);
    })
    .catch((error) => {
      console.log(`Storage get error: ${error}`);
    });
}

export async function removeStorage(name: string) {
  await EncryptedStorage.removeItem(name)
    .then(() => {
      console.log("Storage removed");
    })
    .catch((error) => {
      console.log(`Storage remove error: ${error}`);
    });
}
