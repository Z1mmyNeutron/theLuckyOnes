

import React from "react";
import "./App.css";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import "@cloudscape-design/global-styles/index.css";
import { NavbarView } from "./common/navbar/navbarView.tsx";
import { NavbarViewModel } from "./common/navbar/navbarViewModel.ts";
import { AboutView, AboutViewModel } from "./common/components/about.tsx";
import { HomeView, HomeViewModel } from "./common/components/home.tsx";
import { PoemView, PoemViewModel } from "./common/components/poems.tsx";
import ContactView from "./common/components/contact.tsx";
import { ContactViewModel } from "./common/components/contact.tsx";
import { StoryView, StoryViewModel } from "./common/components/stories.tsx";

function serverCall(url: string, callback: ((data: any) => void)) {
  fetch(url).then((res) => res.json()).then(callback);
}
const serverUrl = `http://localhost:8000`;

class AppViewModel {
  name: string = "";
  link: string = "https://www.amazon.com/Lucky-Ones-Christina-Zimmer-ebook/dp/B0D2DX3QG1/ref=sr_1_1?crid=2S01KX248CW62&dib=eyJ2IjoiMSJ9.5b2DUQbKhrxCUnUMzADodtJdVtn6NYqLs_-vFEqRQCX93fwrQIuq5vxI3833zNyZQGoaAA6JmZ_wADekCgkKPgkJw7cG6YeLSBBk4J5HWw5WhLyr6bQ1DPhnA9Fa4rkGMcheS8SfQtiQ8SOzsTzY87BbwAHpGl6bZaPNYFVduo_B2ao-P_PjY7wn501DM-Ix8LRutWO7RrorV1OFYorItjfjG1wP6hiV2Rl8f7LrnkM.U_CnhwTnablo4Ei0vE8Ut2Qm90GnDNIKqPWSqMAlarU&dib_tag=se&keywords=the+lucky+ones+christina+zimmer&qid=1714100863&s=digital-text&sprefix=the+lucky+ones+chr%2Cdigital-text%2C118&sr=1-1";
  linkText: string = "Purchase here Book";
  message: string = "Love it";
  isDarkMode: boolean = true; // Default to dark mode

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  async init() {
    serverCall(`${serverUrl}/message`, (data) => { this.message = data.message; });
  }
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');

  }
}

function AppViewBuilder() {
  return observer(({ viewModel, navbar, homeViewModel, aboutViewModel, poemViewModel, contactViewModel, storyViewModel }: { viewModel: AppViewModel, navbar: NavbarViewModel, homeViewModel: HomeViewModel, aboutViewModel: AboutViewModel, poemViewModel: PoemViewModel, contactViewModel: ContactViewModel, storyViewModel: StoryViewModel }) => {
    return (
      <div className="App">
        <h1>
          <div style={{ alignItems: "horizontal", marginLeft: "5%", color: "white", width: "90%", display: "grid", gridTemplateColumns: "1r 1r 1r" }}>
            <NavbarView
              viewModel={navbar}
              onThemeToggle={() => viewModel.toggleTheme()}
              isDarkMode={viewModel.isDarkMode}
            />
            {navbar.currentRoute === '/contact' && <ContactView viewModel={contactViewModel} />}
            {navbar.currentRoute === "/about" && <AboutView viewModel={aboutViewModel} />}
            {navbar.currentRoute === "/poems" && <PoemView viewModel={poemViewModel} navbar={navbar} />}
            {navbar.currentRoute === "/stories" && <StoryView viewModel={storyViewModel} />}
            {navbar.currentRoute === "/" && <HomeView viewModel={homeViewModel} />}


          </div>
          <br />
          <br />
        </h1>
        <br />
        <br />
        <footer> Christina Zimmer | Crzimmer2@gmail.com | Tiktok: TheLuckyOnes | Instagram: Christina_La_Dom |  All Rights Reserved </footer>
      </div>
    );
  });
}

const AppView = AppViewBuilder();
const appViewModel = new AppViewModel();
const navbar = new NavbarViewModel();
const homeViewModel = new HomeViewModel();
const aboutViewModel = new AboutViewModel();
const poemViewModel = new PoemViewModel();
const contactViewModel = new ContactViewModel();
const storyViewModel = new StoryViewModel();

function App() {
  return <AppView viewModel={appViewModel} navbar={navbar} homeViewModel={homeViewModel} aboutViewModel={aboutViewModel} poemViewModel={poemViewModel} contactViewModel={contactViewModel} storyViewModel={storyViewModel} />;
}

export default App;
