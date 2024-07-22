import React, { useState, useEffect } from "react";
import "./App.css";
import { makeAutoObservable, } from "mobx";
import { observer } from "mobx-react";
import { CardView, CardViewModel } from "./common/card.tsx";
import "@cloudscape-design/global-styles/index.css" //cloudscape import
import { NavbarView } from "./common/navbar/navbarView.tsx";
import { NavbarViewModel } from "./common/navbar/navbarViewModel.ts";
import { About } from "./common/components/about.tsx";
import { HomeView, HomeViewBuilder, HomeViewModel } from "./common/components/home.tsx";


//make logic

function serverCall(url: string, callback: ((data: any) => void)) {
  fetch(url).then((res) => res.json()).then(callback);
}
const serverUrl = `http://localhost:8000`


class AppViewModel {
  name: string = "";
  link: string = "https://www.amazon.com/Lucky-Ones-Christina-Zimmer-ebook/dp/B0D2DX3QG1/ref=sr_1_1?crid=2S01KX248CW62&dib=eyJ2IjoiMSJ9.5b2DUQbKhrxCUnUMzADodtJdVtn6NYqLs_-vFEqRQCX93fwrQIuq5vxI3833zNyZQGoaAA6JmZ_wADekCgkKPgkJw7cG6YeLSBBk4J5HWw5WhLyr6bQ1DPhnA9Fa4rkGMcheS8SfQtiQ8SOzsTzY87BbwAHpGl6bZaPNYFVduo_B2ao-P_PjY7wn501DM-Ix8LRutWO7RrorV1OFYorItjfjG1wP6hiV2Rl8f7LrnkM.U_CnhwTnablo4Ei0vE8Ut2Qm90GnDNIKqPWSqMAlarU&dib_tag=se&keywords=the+lucky+ones+christina+zimmer&qid=1714100863&s=digital-text&sprefix=the+lucky+ones+chr%2Cdigital-text%2C118&sr=1-1";
  linkText: string = "Purchase here Book";
  message: string = "Love it";
  // cardViewModels: CardViewModel[] = [
  //   new CardViewModel("book1", "back"),
  //   new CardViewModel("book3", "back"),
  //   new CardViewModel("book4", "back2"),
  //   new CardViewModel("book5", "book2"),
  //   new CardViewModel("book6", "back2"),
  //   new CardViewModel("book6", "back2"),
  //   new CardViewModel("book7", "back2"),
  //   new CardViewModel("book8", "back2"),
  //   new CardViewModel("book9", "back2"),
  //   new CardViewModel("book10", "back2"),
  //   new CardViewModel("book11", "back2"),
  // ]

  constructor() {
    makeAutoObservable(this);

    this.init();
  }

  async init() {
    serverCall(`${serverUrl}/message`, (data) => { this.message = data.message; });

  }
}

function Link(href: string, text: string) {
  console.log(window.location)
  return <a
    href={href}
    target="_blank"
  >
    {text}
  </a>

}
///view

function AppViewBuilder() {
  return observer(({ viewModel, navbar, homeViewModel }: { viewModel: AppViewModel, navbar: NavbarViewModel, homeViewModel: HomeViewModel }) => {
    return (
      <div className="App">

        <h1>
          <div style={{ alignItems: "horizontal" }}>
            <NavbarView viewModel={navbar}></NavbarView>

            {navbar.currentRoute === "/about" && <About></About>}
            {navbar.currentRoute === "/" && <HomeView viewModel={homeViewModel} />}

            <h2>The lucky ones</h2>
            <p>
              {Link(viewModel.link, viewModel.linkText)}
            </p>
            <div style={{ margin: "10%", width: "80%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
              {/* {viewModel.cardViewModels.map(card => <CardView viewModel={card} />)} */}
            </div>
          </div>
        </h1 >
        <h1>{viewModel.message}</h1>
      </div >
    );
  });
}

const AppView = AppViewBuilder();
const appViewModel = new AppViewModel()
const navbar = new NavbarViewModel();
const homeViewModel = new HomeViewModel();

function App() {

  return <AppView viewModel={appViewModel} navbar={navbar} homeViewModel={homeViewModel} />


}

export default App;
