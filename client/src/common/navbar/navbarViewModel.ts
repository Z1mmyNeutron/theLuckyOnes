import { makeAutoObservable } from "mobx";
import { poems } from "../data/poemsData.ts";
import "../../App.css";

export interface SearchableItem {
  id: string;
  title: string;
  content: string;
  type: "poem" | "story" | "about" | "home";
  route: string;
  section?: string;
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
  showShareDropdown: boolean = false;

  routes = [
    { name: "About", url: "/about" },
    { name: "Poems", url: "/poems" },
    { name: "The Lucky Ones", url: this.link },
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

    // Create comprehensive searchable content
    const searchableItems: SearchableItem[] = [
      // Poems
      ...poems.map((poem, index) => ({
        id: `poem-${index + 1}`,
        title: poem.title,
        content: poem.content,
        type: "poem" as const,
        route: "/poems",
        section: "Poems",
      })),

      // About page content
      {
        id: "about-author",
        title: "About the Author",
        content:
          "I'm Christina. I write code for a living and poetry to stay alive. I live in Philly now, but most of my real living happens in the spaces between what I can say out loud and what I have to write down.",
        type: "about" as const,
        route: "/about",
        section: "About",
      },
      {
        id: "about-lucky-ones",
        title: "About The Lucky Ones",
        content:
          "The Lucky Ones started as the things I couldn't say to people's faces. The words that came too late, the apologies that never got spoken, the love that got stuck in my throat. It's the collection of moments when I was too afraid to be honest, so I wrote it down instead.",
        type: "about" as const,
        route: "/about",
        section: "About",
      },
      {
        id: "about-creative-process",
        title: "The Creative Process",
        content:
          "I don't have a process. I have moments when the words won't stay inside anymore. I write them down, I paint what I can't say, and sometimes it makes sense later. Most of the time it doesn't, but that's okay. The art isn't in having it figured out—it's in the trying.",
        type: "about" as const,
        route: "/about",
        section: "About",
      },

      // Home page content
      {
        id: "home-intro",
        title: "The Lucky Ones",
        content:
          "A collection of poems and thoughts. Words I couldn't keep inside.",
        type: "home" as const,
        route: "/",
        section: "Home",
      },
    ];

    const query = this.searchQuery.toLowerCase();
    this.searchResults = searchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.section?.toLowerCase().includes(query)
    );
  }

  selectSearchResult(item: SearchableItem) {
    // Navigate to the appropriate route
    this.currentRoute = item.route;

    // Handle different content types
    if (item.type === "poem") {
      this.selectedPoemId = item.id;
      this.showOnlySelectedPoem = true;
    } else {
      // For about and home content, clear poem selection
      this.selectedPoemId = null;
      this.showOnlySelectedPoem = false;
    }

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

  toggleShareDropdown() {
    this.showShareDropdown = !this.showShareDropdown;
  }

  closeShareDropdown() {
    this.showShareDropdown = false;
  }

  getCurrentPageTitle(): string {
    switch (this.currentRoute) {
      case "/":
        return "The Lucky Ones - Home";
      case "/about":
        return "About Christina Zimmer - The Lucky Ones";
      case "/poems":
        return "Poems - The Lucky Ones";
      default:
        return "The Lucky Ones";
    }
  }

  getCurrentPageUrl(): string {
    return window.location.origin + this.currentRoute;
  }

  shareToInstagram() {
    // Instagram doesn't have a direct web sharing API, so we'll copy the URL and open Instagram
    const url = this.getCurrentPageUrl();
    navigator.clipboard.writeText(url).then(() => {
      // Open Instagram in a new tab
      window.open("https://www.instagram.com/", "_blank");
      // You could add a toast notification here saying "Link copied! Paste it in your Instagram story or post."
    });
    this.closeShareDropdown();
  }

  shareToPinterest() {
    const url = this.getCurrentPageUrl();
    const title = this.getCurrentPageTitle();
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      url
    )}&description=${encodeURIComponent(title)}`;
    window.open(pinterestUrl, "_blank");
    this.closeShareDropdown();
  }

  shareToTikTok() {
    // TikTok doesn't have a direct web sharing API, so we'll copy the URL and open TikTok
    const url = this.getCurrentPageUrl();
    navigator.clipboard.writeText(url).then(() => {
      // Open TikTok in a new tab
      window.open("https://www.tiktok.com/", "_blank");
      // You could add a toast notification here saying "Link copied! Paste it in your TikTok video or bio."
    });
    this.closeShareDropdown();
  }
}
