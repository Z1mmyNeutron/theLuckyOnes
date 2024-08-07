// src/common/components/MockContactViewModel.ts
import { makeAutoObservable } from "mobx";

export class MockContactViewModel {
  name: string = "";
  email: string = "";
  message: string = "";
  artist: string = "Christina Zimmer";

  constructor() {
    makeAutoObservable(this);
  }

  submissionStatus: string = "";

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await this.submitContactForm();
      this.submissionStatus = "Message sent successfully!";
    } catch (error) {}
  };
  async submitContactForm() {
    try {
      const response = await fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          message: this.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert("Message sent successfully");
      // Optionally clear the form fields
      this.name = "";
      this.email = "";
      this.message = "";
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message");
    }
  }
}
