import fs from 'fs';
import path from 'path';

const POSTS_DIR = path.join(__dirname, '../content/posts');

// Clean up existing posts
if (fs.existsSync(POSTS_DIR)) {
    console.log('Cleaning up existing posts...');
    fs.rmSync(POSTS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(POSTS_DIR, { recursive: true });

const topics = [
    'Fintech India', 'Mobile Phones', 'Digital India', 'Credit Cards',
    'Startups', 'Government Schemes', 'AI in India', 'Travel Tech',
    'Online Shopping', 'Cyber Security'
];

const titles = [
    // Fintech & Payments (Late 2025)
    "UPI in Late 2025: How Biometric Payments Are Changing the Game",
    "Digital Rupee (e₹-R) vs. UPI: What Should You Use in 2025?",
    "The Rise of BNPL in Tier-2 Cities: Is It a Debt Trap?",
    "Account Aggregators: How They Are Simplifying Loans in India",
    "Navigating the New RBI Guidelines for Digital Lending 2025",

    // Mobile Phones (Late 2025 Launches)
    "iPhone 17 India Launch: Expected Price and Pro Features",
    "Oppo Find X9 Series: The New Camera King in India?",
    "OnePlus 15 vs. iQOO 15: The Ultimate Flagship Battle",
    "Best 5G Smartphones Under ₹15,000 in Late 2025",
    "Realme GT 8 Pro Review: Gaming Beast for Indian Gamers",
    "Vivo X300 Pro: ZEISS Optics Meets AI Magic",
    "Samsung Galaxy Z Fold 7: Is It Finally Durable Enough for India?",
    "Xiaomi 17 Pro Max: HyperOS 2.0 and Snapdragon 8 Elite Gen 5",
    "The Future of Budget 5G: Tecno and Infinix's 2025 Roadmap",
    "Google Pixel 10 in India: Tensor G5 and Local Manufacturing",

    // Digital India & Gov Tech
    "India AI Mission: How ₹2,000 Crore is Fueling Local LLMs",
    "Semiconductor 2.0: India's Push for Fab Manufacturing in 2025",
    "BharatNet Phase 3: Bringing 5G to Every Gram Panchayat",
    "DigiLocker 2.0: New Features You Need to Know",
    "The Digital Personal Data Protection (DPDP) Act: Impact on Users",

    // Credit Cards (2025 Editions)
    "Axis Atlas vs. HDFC Regalia Gold: Best Travel Card for 2025?",
    "SBI Cashback Card Review: Still the King of Online Shopping?",
    "HDFC Infinia Metal: Is the Invite-Only Hype Worth It?",
    "Best RuPay Credit Cards for UPI Payments in 2025",
    "Amex Platinum Travel: Maximizing Rewards for Domestic Travel",
    "HSBC Live+ Review: The Best Dining Card in India?",
    "Flipkart Axis vs. Amazon Pay ICICI: The Ultimate Showdown 2025",
    "Zero Forex Cards: RBL World Safari vs. Niyo Global",
    "IDFC First Wealth: Lifetime Free Premium Benefits Explained",
    "Standard Chartered Smart Credit Card: Good for Beginners?",

    // AI & Tech Trends
    "Generative AI in Indian Vernacular Languages: Bhashini and Beyond",
    "The Boom of Deep Tech Startups in Bengaluru: 2025 Report",
    "Voice Search SEO: Optimizing for 'Ok Google' in Hindi",
    "Influencer Marketing in 2025: The Rise of Nano-Influencers in India",
    "Web3 and Metaverse: Are Indian Brands Still Interested?",

    // Lifestyle & Shopping
    "Flipkart Big Billion Days 2025: Predictions and Best Deals",
    "Amazon Great Indian Festival 2025: How to Save Max Money",
    "Quick Commerce Battle: Blinkit vs. Zepto in Late 2025",
    "ONDC vs. Zomato/Swiggy: Has Open Network Disrupted Food Delivery?",
    "Electric Scooters in 2025: Ola S1 Pro Gen 3 vs. Ather Rizta",

    // Cyber Security
    "Rising UPI Frauds in 2025: How to Stay Safe",
    "Deepfake Scams in India: Spotting AI-Generated Voice Calls",
    "Sim Swap Frauds: Protecting Your OTPs and Bank Accounts",
    "VPN Laws in India 2025: What You Can and Cannot Do",
    "Cloud Security for Indian SMBs: Best Practices",

    // Miscellaneous
    "Work from Home in 2025: Trends in Indian IT Sector",
    "The Growth of Online Gaming and Esports in India",
    "Smart Home Gadgets for Indian Households: 2025 Guide",
    "Renewable Energy: Solar Rooftop Schemes in India 2025",
    "Telemedicine in India: Top Apps for Online Consultations"
];

function generateLorem(words: number): string {
  const lorem = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum ";
  let result = "";
  while (result.split(' ').length < words) {
    result += lorem;
  }
  return result.split(' ').slice(0, words).join(' ');
}

function generatePostContent(title: string, index: number): string {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const date = new Date().toISOString().split('T')[0];
  const category = topics[index % topics.length];
  const tags = [category.split(' ')[0].toLowerCase(), 'india', '2025', 'tech'];
  const otherPostSlug = titles[(index + 1) % titles.length].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // Contextual content generation based on title keywords
  let intro = "";
  if (title.includes("UPI")) {
      intro = "Unified Payments Interface (UPI) has revolutionized how India transacts. In late 2025, we are seeing a massive shift towards biometric authentication and cross-border linkages.";
  } else if (title.includes("Credit Card")) {
      intro = "Choosing the right credit card in India can save you lakhs. With devaluation trends in 2024, the 2025 landscape focuses on core value and travel benefits.";
  } else if (title.includes("Phone") || title.includes("Review")) {
      intro = "The Indian smartphone market is heating up. With 5G now ubiquitous even in budget segments, the focus has shifted to on-device AI and premium build quality.";
  } else {
      intro = \`In the rapidly evolving landscape of **\${category}** in India, staying ahead of the curve is crucial. This article explores **\${title}** and its impact on the Indian market in late 2025.\`;
  }

  return \`---
title: "\${title}"
date: "\${date}"
description: "A detailed look at \${title}, covering trends, analysis, and impact on the Indian market in late 2025."
tags: [\${tags.map(t => \`"\${t}"\`).join(', ')}]
slug: "\${slug}"
author: "Omni-Bot India"
---

# \${title}

\${intro}

## The Current Landscape in India (Late 2025)

As we navigate through late 2025, the Indian ecosystem for **\${category}** has matured significantly.
\${generateLorem(100)}

## Key Developments and Trends

1. **Adoption in Tier-2 and Tier-3 Cities**: The penetration of digital services has gone beyond metros like Mumbai and Bengaluru.
2. **Regulatory Support**: Initiatives by the Government of India and regulators like RBI/SEBI have been pivotal.
3. **Technological Integration**: AI and ML are no longer buzzwords but integral parts of the user experience.

## Detailed Analysis

### Impact on Consumers
For the average Indian consumer, this means more choice and better value. Whether it's saving on groceries with **Blinkit** or **Zepto**, or getting 5% cashback with the **SBI Cashback Card**, the options are endless.
\${generateLorem(150)}

### Market Predictions for 2026
Experts predict that this trend will continue to grow.
\${generateLorem(100)}

## Conclusion

To sum up, **\${title}** represents a significant milestone. As technology evolves, staying informed is key.

> **Note**: Always do your own research before making financial decisions.

For more insights, check out our next article: [\${titles[(index + 1) % titles.length]}](/posts/\${otherPostSlug}.html).
\`;
}

console.log('Generating 50 India-centric posts for Late 2025...');
titles.forEach((title, index) => {
  const content = generatePostContent(title, index);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  fs.writeFileSync(path.join(POSTS_DIR, \`\${slug}.md\`), content);
});
console.log('Done! Generated ' + titles.length + ' posts.');
