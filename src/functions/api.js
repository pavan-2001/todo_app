import firebase from './firebase';
import Promise from 'bluebird';

export const generateUserDocument = async (user, displayName) => {
    if (!user) return;
    const userRef = firebase.firestore().doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email} = user;
      try {
        await userRef.set({
          email, 
          displayName
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };
  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firebase.firestore().doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

export const getAllTodo =async (owner) => {
  const result =await firebase.firestore().collection('todos').where('owner', '==', owner).get().then((data) => {
    let todoList = [];
    data.forEach((doc) => {
      todoList.push({
        id : doc.id,
        title : doc.data().title, 
        owner : doc.data().owner, 
        isCompleted : doc.data().isCompleted, 
        createdAt : doc.data().createdAt
      });
    });
    todoList.filter((e) => {
      return e.owner === owner;
    });
    return todoList;
  });
  return new Promise.resolve(result);
};

export const editTodo =async (id, body) => {
  let document = firebase.firestore().collection('todos').doc(`${id}`).update(body);
  return new Promise.resolve(document);
};

export const deleteTodo =async (id) => {
  firebase.firestore().collection('todos').doc(`${id}`).delete();
  return new Promise.resolve();
};

export const addTodo =async (body) => {
  firebase.firestore().collection('todos').add(body);
  return new Promise.resolve();
};