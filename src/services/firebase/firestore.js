import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  orderBy,
  where,
  updateDoc,
  setDoc
  // where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect } from "react";
import { contextJob } from "../../services/context/jobContext";

const firebaseConfig = {
  apiKey: "AIzaSyDATFN6O8q45udQEIlzCz6a20xLKY2YMeE",
  authDomain: "job-app-c77af.firebaseapp.com",
  projectId: "job-app-c77af",
  storageBucket: "job-app-c77af.appspot.com",
  messagingSenderId: "807559066788",
  appId: "1:807559066788:web:f0ee0da3564f5312fda231",
  measurementId: "G-WM7ME7BVY0",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export async function getJob() {
  const collectionRef = collection(db, "jobs");
  const q = query(collectionRef, orderBy("uploadDate", "desc"));
  const jobs = await getDocs(q);
  const documents = jobs.docs;

  const data = documents.map((job) => {
    let newJob = {
      id: job.id,
      ...job.data(),
    };
    return newJob;
  });

  return data;
}

export async function getJobIndividual(id) {
  const docsCollection = doc(db, "jobs", id);
  const docSnap = await getDoc(docsCollection);
  return { id: docSnap.id, ...docSnap.data() };
}

export async function getSavedJobsUser(userId) {
  const collectionRef = collection(db, "savedJobs")
  const queryJob = query(collectionRef, where("userId", "==", userId))
  const jobsDoc = await getDocs(queryJob) 
  const documents = jobsDoc.docs

  const data = documents.map(job => {
    const newJob = {
      id: job.id,
      ...job.data()
    }
    return newJob;
  })

  return data;
}

export async function exportJobs(
  availability,
  city,
  company,
  country,
  description,
  jobName,
  remote,
  salary,
  seniority,
  tech,
  mail,
  urlLinkedin
) {
  const job = {
    availability: availability,
    city: city,
    company: company,
    country: country,
    description: description,
    jobName: jobName,
    remote: remote,
    salary: salary,
    seniority: seniority,
    tech: tech,
    uploadDate: new Date(),
    mail: mail,
    urlLinkedin: urlLinkedin,
  };

  const collectionRef = collection(db, "jobs");

  const response = await addDoc(collectionRef, job);
  console.log("job export with ID: " + response);
}

export async function saveJob(objId) {
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;
    const savedJob = {
      job: objId,
      userId: userId,
    };
  
    const collectionRef = collection(db, "savedJobs");
  
    const response = await addDoc(collectionRef, savedJob);
    console.log("job exported", response);
  } else {
    console.log("No user logged in");
  }
}

export async function updateProfile(userId, profileData) {
  try {
    const docRef = doc(db, "profile", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Document exists, update the profile data
      await updateDoc(docRef, profileData);
    } else {
      // Document doesn't exist, create a new one with the profile data
      await setDoc(docRef, profileData);
    }

    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

export async function getProfile(userId) {
  const docsCollection = doc(db, "profile", userId);
  const docSnap = await getDoc(docsCollection);
  return { id: docSnap.id, ...docSnap.data() };
}


export async function getAuthFb(email, password) {
  try {
    const userResponse = await signInWithEmailAndPassword(auth, email, password);
    const user = userResponse.user;
    return user;
  } catch (error) {
    throw new Error(`An error occurred: ${error}`);
  }
}

export async function register(email, password) {
  try {
    let userRegister = await createUserWithEmailAndPassword(auth, email, password)
    let user = userRegister.user
    return user;
  } catch (error) {
    throw new Error(`Registration failed. Please check your email and password. Also make sure you are entering a valid email`);
  }
}

export function logOut() {
  auth.signOut()
}

export function useAuthListener() {
  const { setuser, setisAuth} = useContext(contextJob)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
        setisAuth(true);
      } else {
        setuser(null);
        setisAuth(false);
      }
    });

    return () => unsubscribe();
  }, [setuser, setisAuth]);
}


// export async function getJobField(techValue, seniorityValue, countryValue) {
//   const collectionRef = collection(db, "jobs");
//   const query = collectionRef.where("tech", "==", techValue)
//     .where("seniority", "==", seniorityValue)
//     .where("country", "==", countryValue);

//   const querySnapshot = await getDocs(query);

//   const results = [];
//   querySnapshot.forEach((doc) => {
//     results.push(doc.data());
//   });

//   return results;
// }
