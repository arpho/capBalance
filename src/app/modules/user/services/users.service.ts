// tslint:disable: quotemark
import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { ItemServiceInterface } from "../../item/models/ItemServiceInterface";
import { UserModel } from "../models/userModel";
import { ItemModelInterface } from "../../item/models/itemModelInterface";
import * as admin from "firebase-admin";

@Injectable({
  providedIn: "root"
})
export class UsersService implements ItemServiceInterface {
  public usersRef: firebase.database.Reference;
  private loggedUser: UserModel;

  constructor() {
    this.usersRef = firebase.database().ref("/userProfile");
  }

  getItem(key: string) {
    if (this.usersRef) {
      return this.usersRef.child(key);
    }
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  setLoggedUser(key: string) {
    this.loggedUser = new UserModel(undefined, key, this);
    this.loggedUser.load().then(v => {
      this.loggedUser.build(v);
    });
    return this.loggedUser;
  }

  deleteItem(key: string) {
    return this.usersRef.child(key).remove();
  }

  getDummyItem() {
    return new UserModel();
  }

  createItem(item: ItemModelInterface) {
    return this.usersRef.push(item.serialize());
  }

  getEntitiesList(): firebase.database.Reference {
    return this.usersRef;
  }

  updateItem(item: ItemModelInterface) {
    return this.usersRef.child(item.key).update(item.serialize());
  }
}
