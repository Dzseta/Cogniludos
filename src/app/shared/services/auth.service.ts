import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dbPath = 'users';
  usersRef: AngularFirestoreCollection<User>;

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.usersRef = afs.collection(this.dbPath);
  }

  // login
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // check if somebody already has this username
  userExists(user: User) {
    return this.usersRef.ref.where('username', '==', user.username).get();
  }

  // check if this email address is already in use
  getUserByEmail(email: string) {
    return this.usersRef.ref.where('email', '==', email).get();
  }

  getAllUsers() {
    return this.usersRef.ref.get();
  }

  // sign up
  signup(email: string, password: string, user: User) {
    this.usersRef.add({ ...user });
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // update profile datails
  update(user: User) {
    return this.usersRef.ref.where("email", "==", user.email).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(document) {
        document.ref.update(user);
      });
    });
  }

  // is logged in
  isUserLoggedIn() {
    return this.auth.user;
  }

  // logout
  logout() {
    localStorage.clear();
    return this.auth.signOut();
  }

}
