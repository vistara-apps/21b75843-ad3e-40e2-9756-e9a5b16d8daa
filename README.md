# HealthSync AI

Your Personalized Health Hub, Powered by AI - A Base Mini App for comprehensive health management and tracking.

## Features

### 🏥 Core Health Management
- **Symptom & Trigger Tracker**: Log symptoms, identify triggers, and track treatment effectiveness
- **AI-Powered Health Insights**: Get personalized recommendations based on your health patterns
- **Condition-Specific Content**: Curated articles, videos, and research for your health conditions
- **Health Trend Alerts**: Stay updated with the latest research and treatments relevant to you

### 🔗 Base Mini App Integration
- **Wallet Connection**: Seamless onchain authentication via OnchainKit
- **In-Frame Actions**: Log symptoms and view alerts directly in Farcaster
- **Push Notifications**: Get notified about important health updates
- **Decentralized Storage**: Content stored on IPFS via Pinata

### 💎 Subscription Features
- **Free Tier**: Basic symptom logging and limited content access
- **Premium Tier** ($5/month): Advanced analytics, full content library, AI insights

## Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Blockchain**: Base network integration via OnchainKit
- **Backend**: Supabase for data management
- **AI**: OpenAI for health insights and pattern analysis
- **Storage**: Pinata for decentralized content storage
- **Authentication**: Privy for wallet-based auth
- **Payments**: Stripe integration for subscriptions

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Base wallet or compatible Web3 wallet

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd healthsync-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your API keys:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase configuration
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `PINATA_API_KEY` & `PINATA_SECRET_API_KEY`: Pinata for IPFS storage
- `NEXT_PUBLIC_PRIVY_APP_ID`: Privy app ID for authentication
- `STRIPE_SECRET_KEY` & `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe for payments

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

Set up your Supabase database with the following tables:

```sql
-- Users table
CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT,
  selected_conditions TEXT[],
  notification_preferences JSONB,
  subscription_status TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Symptom logs table
CREATE TABLE symptom_logs (
  log_id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(user_id),
  timestamp TIMESTAMP NOT NULL,
  symptoms TEXT[],
  triggers TEXT[],
  treatment_responses JSONB,
  severity INTEGER,
  mood INTEGER,
  notes TEXT
);

-- Content table
CREATE TABLE content (
  content_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  summary TEXT,
  relevant_conditions TEXT[],
  author TEXT,
  published_date TIMESTAMP,
  reading_time INTEGER,
  is_premium BOOLEAN DEFAULT FALSE
);

-- Health trend alerts table
CREATE TABLE health_trend_alerts (
  alert_id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(user_id),
  timestamp TIMESTAMP DEFAULT NOW(),
  title TEXT NOT NULL,
  summary TEXT,
  source_url TEXT,
  relevance_score DECIMAL,
  category TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  priority TEXT DEFAULT 'medium'
);
```

## Usage

### As a Base Mini App

1. **Connect Wallet**: Use your Base wallet to authenticate
2. **Select Conditions**: Choose your health conditions during onboarding
3. **Log Symptoms**: Track your daily symptoms and triggers
4. **Explore Content**: Browse curated health information
5. **Monitor Trends**: Stay updated with AI-powered health alerts

### In-Frame Actions

When used within Farcaster:
- Quick symptom logging
- View latest health alerts
- Access condition-specific content
- Receive push notifications for important updates

## API Integration

### Supabase
- User data management
- Symptom log storage
- Content delivery
- Real-time updates

### OpenAI
- Symptom pattern analysis
- Health trend summarization
- Personalized recommendations

### Pinata
- Decentralized content storage
- IPFS-based article hosting
- Censorship-resistant data

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@healthsync.ai or join our community Discord.

## Roadmap

- [ ] Advanced AI pattern recognition
- [ ] Integration with wearable devices
- [ ] Telemedicine consultations
- [ ] Community health challenges
- [ ] NFT-based health achievements
- [ ] Multi-language support

---

Built with ❤️ for the Base ecosystem and health-conscious individuals worldwide.
