import React, { useState } from 'react';

const NewsletterSubscription = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Subscribed with email: ${email}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Subscribe</button>
        </form>
    );
};

export default NewsletterSubscription;
