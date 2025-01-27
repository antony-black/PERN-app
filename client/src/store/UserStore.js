import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(value) {
    this._isAuth = value;
  }

  setUser(userData) {
    this._user = userData;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}