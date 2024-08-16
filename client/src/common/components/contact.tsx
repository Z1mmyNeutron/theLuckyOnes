
// import React, { ChangeEvent, FormEvent, useState } from "react";
// import { observer } from "mobx-react";
// import { makeAutoObservable } from "mobx";
// import "../components/home.css"; // Assuming you have some styles

// // Define the ContactViewModel class
// export class ContactViewModel {
//     artist = "Christina Zimmer";
//     myEmail = "crzimmer2@gmail.com";
//     instagram = "Christina_La_Dom";
//     tiktok = "TheLuckyOnes";

//     form: { [key: string]: string } = {
//         name: "",
//         email: "",
//         message: "",
//     };

//     constructor() {
//         makeAutoObservable(this);
//     }

//     updateField(field: keyof typeof this.form, value: string) {
//         this.form[field] = value;
//     }

//     async submitForm() {
//         console.log('Form Submitted:', this.form);
//         // Perform actual submission, e.g., sending data to a server
//     }
// }

// // Define props interface
// interface ContactViewProps {
//     viewModel: ContactViewModel;
// }

// // Define the ContactView component
// const ContactView: React.FC<ContactViewProps> = observer(({ viewModel }) => {
//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         viewModel.updateField(e.target.name as keyof typeof viewModel.form, e.target.value);
//     };

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         viewModel.submitForm();
//     };

//     return (
//         <div style={{ color: "white", margin: "10%", width: "80%" }}>
//             <h1>Contact Us</h1>
//             <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
//                 <label>
//                     Name:
//                     <input
//                         type="text"
//                         name="name"
//                         value={viewModel.form.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Email:
//                     <input
//                         type="email"
//                         name="email"
//                         value={viewModel.form.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Message:
//                     <textarea
//                         name="message"
//                         value={viewModel.form.message}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <button type="submit">Submit</button>
//             </form>
//             <div style={{ marginTop: "2rem" }}>
//                 <p><strong>Artist:</strong> {viewModel.artist}</p>
//                 <p><strong>Email:</strong> {viewModel.myEmail}</p>
//                 <p><strong>Instagram:</strong> {viewModel.instagram}</p>
//                 <p><strong>TikTok:</strong> {viewModel.tiktok}</p>
//             </div>
//         </div>
//     );
// });
// export default ContactView;


import React, { ChangeEvent, FormEvent } from "react";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import './home.css'; // Import your CSS file

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
