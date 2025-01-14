import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "./firebase";
export const auth = getAuth(app);

export const Register = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Update the user's display name using updateProfile function
    await updateProfile(user, {
      displayName: name,
    });

    console.log(user);
    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const Login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    console.log(user);
    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const Logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
