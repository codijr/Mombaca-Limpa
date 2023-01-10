import auth from "@react-native-firebase/auth";

export async function signUp(email: string, password: string) {
  const value = await auth().createUserWithEmailAndPassword(email, password);
  return value;
}

export async function login(email: string, password: string) {
  const value = await auth().signInWithEmailAndPassword(email, password);
  return value;
}

export async function signOut() {
  const value = await auth().signOut();
  return value;
}

const actualUser = auth().currentUser;

export async function reauthenticateWithCredential(password: string) {
  if (actualUser !== null && actualUser.email !== null) {
    const currentEmail = actualUser.email;
    const credential = auth.EmailAuthProvider.credential(
      currentEmail,
      password
    );
    const value = await actualUser.reauthenticateWithCredential(credential);
    return value;
  }
}

export async function changeEmail(newEmail: string, password: string) {
  reauthenticateWithCredential(password).then(() => {
    if (actualUser !== null) {
      const value = actualUser.updateEmail(newEmail);
      return value;
    }
  });
}

export async function changePassword(newPassword: string, oldPassword: string) {
  reauthenticateWithCredential(oldPassword).then(() => {
    if (actualUser !== null) {
      const value = actualUser.updatePassword(newPassword);
      return value;
    }
  });
}
