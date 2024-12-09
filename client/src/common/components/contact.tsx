
import React, { ChangeEvent, FormEvent } from "react";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import "../../App.css"

// Define ContactViewModel
export class ContactViewModel {
    form = { name: "", email: "", message: "" };

    constructor() {
        makeAutoObservable(this);
    }

    updateField(field: keyof typeof this.form, value: string) {
        this.form[field] = value;
    }

    async submitForm() {
        console.log('Form Submitted:', this.form);
    }
}

// Define and export ContactView component
const ContactView: React.FC<{ viewModel: ContactViewModel }> = observer(({ viewModel }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        viewModel.updateField(e.target.name as keyof typeof viewModel.form, e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        viewModel.submitForm();
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <label className="contact-label">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={viewModel.form.name}
                        onChange={handleChange}
                        className="contact-input"
                        required
                    />
                </label>
                <label className="contact-label">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={viewModel.form.email}
                        onChange={handleChange}
                        className="contact-input"
                        required
                    />
                </label>
                <label className="contact-label">
                    Message:
                    <textarea
                        name="message"
                        value={viewModel.form.message}
                        onChange={handleChange}
                        className="contact-textarea"
                        required
                    />
                </label>
                <button type="submit" className="contact-button">Submit</button>
            </form>
        </div>
    );
});

export default ContactView;
