import { makeAutoObservable } from "mobx";
import { poems } from "../data/poemsData.ts";
import "../../App.css";

export interface SearchableItem {
  id: string;
  title: string;
  content: string;
  type: "poem" | "story";
}

export class NavbarViewModel {
  constructor() {
    makeAutoObservable(this);
  }

  name: string = "The Lucky Ones";
  author: string = "By: Christina Zimmer";
  link: string =
    "https://www.amazon.com/Lucky-Ones-Christina-Zimmer-ebook/dp/B0D2DX3QG1/ref=sr_1_1?crid=2S01KX248CW62&dib=eyJ2IjoiMSJ9.5b2DUQbKhrxCUnUMzADodtJdVtn6NYqLs_-vFEqRQCX93fwrQIuq5vxI3833zNyZQGoaAA6JmZ_wADekCgkKPgkJw7cG6YeLSBBk4J5HWw5WhLyr6bQ1DPhnA9Fa4rkGMcheS8SfQtiQ8SOzsTzY87BbwAHpGl6bZaPNYFVduo_B2ao-P_PjY7wn501DM-Ix8LRutWO7RrorV1OFYorItjfjG1wP6hiV2Rl8f7LrnkM.U_CnhwTnablo4Ei0vE8Ut2Qm90GnDNIKqPWSqMAlarU&dib_tag=se&keywords=the+lucky+ones+christina+zimmer&qid=1714100863&s=digital-text&sprefix=the+lucky+ones+chr%2Cdigital-text%2C118&sr=1-1";
  linkText: string = "Purchase Here Book";
  currentRoute = "/";
  searchQuery: string = "";
  searchResults: SearchableItem[] = [];
  selectedPoemId: string | null = null;
  showOnlySelectedPoem: boolean = false;

  routes = [
    { name: "The Lucky Ones", url: this.link },
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Poems", url: "/poems" },
    // { name: "Contact", url: "/contact" },
    // { name: "Stories", url: "/stories" },
  ];

  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.performSearch();
  }

  performSearch() {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }

    // Convert poems to searchable items dynamically
    const searchableItems: SearchableItem[] = poems.map((poem, index) => ({
      id: `poem-${index + 1}`,
      title: poem.title,
      content: poem.content,
      type: "poem" as const,
    }));

    const query = this.searchQuery.toLowerCase();
    this.searchResults = searchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
    );
  }

  selectSearchResult(item: SearchableItem) {
    this.currentRoute = `/${item.type}s`; // Use plural form to match the routes
    this.selectedPoemId = item.id; // Store the selected poem ID for highlighting
    this.showOnlySelectedPoem = true; // Show only the selected poem
    this.searchQuery = "";
    this.searchResults = [];
  }

  clearSelectedPoem() {
    this.selectedPoemId = null;
    this.showOnlySelectedPoem = false; // Show all poems again
  }

  showAllPoems() {
    this.showOnlySelectedPoem = false;
    this.selectedPoemId = null;
  }
}
