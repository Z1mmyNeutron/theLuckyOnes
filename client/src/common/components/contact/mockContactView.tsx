// src/common/components/MockContactView.tsx
import React from 'react';
import { observer } from 'mobx-react';
import { MockContactViewModel } from './mockContactViewModel';

interface MockContactViewProps {
    viewModel: MockContactViewModel;
}

const MockContactView: React.FC<MockContactViewProps> = observer(({ viewModel }) => {

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
                <button type="submit">Send</button>
            </form>
            {viewModel.submissionStatus && <p>{viewModel.submissionStatus}</p>}
            <div>
                <p>{viewModel.artist}</p>
            </div>
        </div>
    );
});

export default MockContactView;
