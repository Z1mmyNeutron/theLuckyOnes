import { makeAutoObservable, observable } from "mobx";

export class NavbarViewModel {
  constructor() {
    makeAutoObservable(this);
  }
  currentRoute = "/";
  routes = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ];
}
