import React from 'react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';

class MockContactViewModel {
    name: string = "";
    email: string = "";
    message: string = "";
    artist: string = "Christina Zimmer";
    submissionStatus: string = "";
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        this.loading = true;
        this.submissionStatus = "";
        try {
            await this.submitContactForm();
            this.submissionStatus = "Message sent successfully!";
        } catch (error) {
            this.submissionStatus = "Failed to send message. Please try again.";
        } finally {
            this.loading = false;
        }
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
            console.log("Message sent successfully:", result);
            // Optionally clear the form fields
            this.name = "";
            this.email = "";
            this.message = "";
        } catch (error) {
            console.error("Error submitting contact form:", error);
            throw error; // Propagate error to be handled in handleSubmit
        }
    }
}

interface MockContactProps {
    viewModel: MockContactViewModel;
}

const MockContact: React.FC<MockContactProps> = observer(({ viewModel }) => {
    return (
        <div style={{ color: 'white', margin: '10%', width: '80%', display: 'grid', gridTemplateColumns: '1fr' }}>
            <h2>Contact Us</h2>
            <form onSubmit={viewModel.handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={viewModel.name}
                        onChange={(e) => viewModel.name = e.target.value}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={viewModel.email}
                        onChange={(e) => viewModel.email = e.target.value}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={viewModel.message}
                        onChange={(e) => viewModel.message = e.target.value}
                        required
                    />
                </div>
                <button type="submit" disabled={viewModel.loading}>
                    {viewModel.loading ? 'Sending...' : 'Send'}
                </button>
            </form>
            {viewModel.submissionStatus && <p>{viewModel.submissionStatus}</p>}
            <div>
                <p>{viewModel.artist}</p>
            </div>
        </div>
    );
});

export { MockContact, MockContactViewModel };
