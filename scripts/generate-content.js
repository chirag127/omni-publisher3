const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "../content/posts");

if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
}

const topics = [
    // Fintech & Finance
    {
        title: "The Rise of UPI: India's Digital Payment Revolution in 2025",
        category: "Fintech",
    },
    {
        title: "CBDC Explained: How the e-Rupee is Changing Money",
        category: "Fintech",
    },
    { title: "Top 5 Neobanks in India for Gen Z", category: "Fintech" },
    { title: "Credit Card Trends: Best Rewards for 2026", category: "Finance" },
    {
        title: "Frugal Living: Saving Money in Tier 1 Cities",
        category: "Lifestyle",
    },
    {
        title: "Investing in Green Energy Stocks: A 2025 Guide",
        category: "Finance",
    },
    {
        title: "Understanding Peer-to-Peer Lending Regulations",
        category: "Fintech",
    },
    {
        title: "The Future of Micro-Insurance in Rural India",
        category: "Fintech",
    },
    {
        title: "Crypto Regulation: What Indian Investors Need to Know",
        category: "Fintech",
    },
    {
        title: "Managing Subscriptions: Tools to Save Money",
        category: "Finance",
    },

    // Technology & AI
    {
        title: "India's Semiconductor Mission: Progress Report 2025",
        category: "Technology",
    },
    { title: "6G in India: What to Expect Beyond 5G", category: "Technology" },
    {
        title: "AI Copilots for Indian Languages: Breaking Barriers",
        category: "AI",
    },
    {
        title: "Green Hydrogen: India's Clean Energy Future",
        category: "Technology",
    },
    { title: "The Boom of SaaS Startups in Bangalore", category: "Business" },
    {
        title: "Cybersecurity Essentials for Remote Workers",
        category: "Technology",
    },
    {
        title: "Quantum Computing: India's Strategic Leap",
        category: "Technology",
    },
    {
        title: "Smart Cities 2.0: AI-Driven Urban Planning",
        category: "Technology",
    },
    {
        title: "The State of Drone Delivery in India 2025",
        category: "Technology",
    },
    { title: "Wearable Tech: Beyond Smartwatches", category: "Gadgets" },

    // Mobile & Gadgets (General/Upcoming)
    {
        title: "Upcoming Smartphones to Watch in Late 2025",
        category: "Gadgets",
    },
    { title: "Poco F7 Review: The Mid-Range King?", category: "Gadgets" },
    { title: "Tecno Camon Premier 20 5G: Camera Test", category: "Gadgets" },
    { title: "Best 5G Phones Under 20000 INR", category: "Gadgets" },
    { title: "Foldable Phones: Are They Durable Yet?", category: "Gadgets" },
    { title: "Gaming Phones vs Flagships: Which to Buy?", category: "Gadgets" },
    {
        title: "The Resurgence of Wired Earphones in Audiophile Circles",
        category: "Gadgets",
    },
    { title: "eSIM Adoption in India: Pros and Cons", category: "Technology" },
    { title: "Best Tablets for Students in 2025", category: "Gadgets" },
    {
        title: "VR Headsets: Is the Metaverse Still a Thing?",
        category: "Technology",
    },

    // Lifestyle & Health
    {
        title: "Ayurveda 2.0: AI-Driven Personalized Wellness",
        category: "Health",
    },
    {
        title: "Sustainable Fashion Brands in India You Should Know",
        category: "Lifestyle",
    },
    {
        title: "Digital Detox: Reclaiming Your Attention Span",
        category: "Wellness",
    },
    {
        title: "The 'Right Now' Economy: 10-Minute Delivery Impact",
        category: "Lifestyle",
    },
    {
        title: "Workation Destinations in Himachal for 2026",
        category: "Travel",
    },
    {
        title: "Plant-Based Diets: Indian Alternatives to Meat",
        category: "Food",
    },
    {
        title: "Minimalist Home Decor Trends for Small Apartments",
        category: "Lifestyle",
    },
    { title: "Mental Health Apps: Do They Really Help?", category: "Wellness" },
    { title: "The Rise of 'Slow Travel' in India", category: "Travel" },
    {
        title: "Urban Gardening: Growing Food on Your Balcony",
        category: "Lifestyle",
    },

    // Tutorials & How-To
    { title: "How to Secure Your UPI Transactions", category: "Security" },
    { title: "Building a PC in 2025: Parts Guide", category: "Technology" },
    {
        title: "Starting a Podcast: Equipment and Software",
        category: "Creator",
    },
    { title: "MediBuddy and Telemedicine: A User Guide", category: "Health" },
    {
        title: "Chrome Extensions for Productivity in 2025",
        category: "Productivity",
    },
    {
        title: "How to Optimize Your Home Wi-Fi Network",
        category: "Technology",
    },
    {
        title: "Learning Coding: Best Resources for Beginners",
        category: "Education",
    },
    {
        title: "Mastering Mobile Photography: Tips and Tricks",
        category: "Photography",
    },
    { title: "Setting Up a Smart Home on a Budget", category: "Technology" },
    { title: "Privacy Guide: protecting Data on Android", category: "Privacy" },
];

const generateContent = (title, category) => {
    return `---
title: "${title}"
date: "${new Date().toISOString()}"
description: "An in-depth look at ${title} and its impact on the Indian market in late 2025."
slug: "${title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}"
tags: ["${category}", "India", "2025", "Trending"]
author: "Omni-Publisher AI"
---

# ${title}

In the rapidly evolving landscape of **${category}**, few topics have garnered as much attention in late 2025 as **${title}**. As India continues its digital transformation, understanding these nuances is critical for consumers and businesses alike.

## The Current Landscape

The ecosystem surrounding ${title} has shifted dramatically over the last year. With new regulations and technological breakthroughs, we are seeing a paradigm shift.

> "The future is not just about technology, but how it integrates with our daily lives."

## Key Developments in 2025

1. **Adoption at Scale**: We have seen massive adoption in Tier 2 and Tier 3 cities.
2. **Regulatory Clarity**: The government has introduced new frameworks to ensure safety and compliance.
3. **Innovation**: Startups are pushing the boundaries of what is possible.

## Why This Matters for You

Whether you are a student, a professional, or a homemaker, ${title} impacts your daily routine. For instance, the integration of AI has made services more accessible than ever.

## Conclusion

As we look towards 2026, ${title} will remain a cornerstone of the **${category}** sector. Stay tuned for more updates.

*Read more about [related topics](/posts) in our ecosystem.*
`;
};

topics.forEach((topic, index) => {
    const content = generateContent(topic.title, topic.category);
    const filename = `${index + 1}-${topic.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}.md`;
    fs.writeFileSync(path.join(postsDir, filename), content);
    console.log(`Generated: ${filename}`);
});

console.log(`Successfully generated ${topics.length} posts.`);
