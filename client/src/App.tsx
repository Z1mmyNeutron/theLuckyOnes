import React, { useState, useEffect } from "react";
import "./App.css";
import { test } from "./common/viewModel.ts";
import { makeAutoObservable, observable } from "mobx";
import { observer } from "mobx-react";
//make logic

function serverCall(url: string, callback: ((data: any) => void)) {
  fetch(url).then((res) => res.json()).then(callback);
}
const serverUrl = `http://localhost:8000`

class AppViewModel {
  //const [message, setMessage] = useState("");
  // test();
  // useEffect(() => {
  //   fetch("http://localhost:8000/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);
  name: string = "";
  link: string = "https://www.amazon.com/Lucky-Ones-Christina-Zimmer-ebook/dp/B0D2DX3QG1/ref=sr_1_1?crid=2S01KX248CW62&dib=eyJ2IjoiMSJ9.5b2DUQbKhrxCUnUMzADodtJdVtn6NYqLs_-vFEqRQCX93fwrQIuq5vxI3833zNyZQGoaAA6JmZ_wADekCgkKPgkJw7cG6YeLSBBk4J5HWw5WhLyr6bQ1DPhnA9Fa4rkGMcheS8SfQtiQ8SOzsTzY87BbwAHpGl6bZaPNYFVduo_B2ao-P_PjY7wn501DM-Ix8LRutWO7RrorV1OFYorItjfjG1wP6hiV2Rl8f7LrnkM.U_CnhwTnablo4Ei0vE8Ut2Qm90GnDNIKqPWSqMAlarU&dib_tag=se&keywords=the+lucky+ones+christina+zimmer&qid=1714100863&s=digital-text&sprefix=the+lucky+ones+chr%2Cdigital-text%2C118&sr=1-1";
  linkText: string = "Purchase here Book";
  message: string = "Proving that this works";

  constructor() {
    makeAutoObservable(this);

    this.init();
  }

  async init() {
    serverCall(`${serverUrl}/message`, (data) => { this.message = data.message; });

  }
}

function Link(href: string, text: string) {
  return <a
    href={href}
    target="_blank"
  >
    {text}
  </a>
}
///view
function AppViewBuilder() {
  return observer(({ viewModel }: { viewModel: AppViewModel }) => {
    return (
      <div className="App">
        <h1>
          <div style={{ alignItems: "horizontal" }}>
            <h1>Navbar placeholder</h1>
            <h2>The lucky ones</h2>
            <p>
              {Link(viewModel.link, viewModel.linkText)}
            </p>
            <p>pull in different data before navbar</p>
          </div>
        </h1 >
        <h1>{viewModel.message}</h1>
      </div >
    );
  });
}

const AppView = AppViewBuilder();
const appViewModel = new AppViewModel()
function App() {

  return <AppView viewModel={appViewModel} />

}

export default App;
