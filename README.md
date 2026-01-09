# TypeMonkey - Advanced Typing Test Application

A modern, feature-rich typing test application built with Next.js, TypeScript, and React. TypeMonkey provides a comprehensive typing experience with real-time analytics, customizable themes, and advanced performance tracking.
I mean at the end of the day it is a monkeytype clone, just made from scratch...

## Features

### Core Typing Experience

- **Real-time typing test** with dynamic word generation
- **Custom cursor tracking** that follows your typing position
- **Smart auto-scrolling** for seamless typing experience
- **Mouse interference protection** - prevents focus loss while actively typing
- **Visual typing mode indicator** with colored border when protection is active
- **Word-by-word timing** for detailed performance analysis

### Advanced Analytics

- **Words Per Minute (WPM)** calculation in real-time
- **Raw typing speed** measurement
- **Typing accuracy** percentage tracking
- **Consistency scoring** using statistical analysis
- **Interactive performance charts** with Chart.js integration
- **Mistake tracking** with visual error indicators
- **Kalman filtering** for smooth data visualization

### Timer & Modes

- **Customizable timer modes**: 15s, 30s, 60s, 120s, and more
- **Real-time countdown** display
- **Automatic test completion** when timer expires
- **Performance snapshots** captured every second during typing

### User Interface

- **Dark/Light theme** support with system preference detection
- **Responsive design** for all screen sizes
- **Modern glassmorphism** UI elements
- **Smooth animations** and transitions
- **Loading states** with custom spinners
- **Clean typography** with Geist mono font

### Results & Statistics

- **Comprehensive results page** with detailed metrics
- **Statistical analysis** including standard deviation
- **Performance consistency** measurements
- **Historical data** visualization with interactive charts
- **Export capabilities** for performance data

## Technology Stack

- **Frontend Framework**: Next.js 15.3.5 with React 19
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS + CSS Modules
- **Charts**: Chart.js for interactive data visualization
- **Icons**: React Icons library
- **Development**: ESLint for code quality
- **Build Tool**: Turbopack for fast development

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd typing-test-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to start typing!

## How to Use

### Starting a Test

1. **Choose your timer** - Select from 15s, 30s, 60s, or custom durations
2. **Begin typing** - Click in the text area or start typing immediately
3. **Stay focused** - The app prevents mouse interference while you're typing
4. **Complete the test** - Finish before time runs out or complete all words

### Understanding Your Results

- **WPM**: Your typing speed in words per minute
- **Raw Speed**: Unfiltered typing speed including mistakes
- **Accuracy**: Percentage of correctly typed characters
- **Consistency**: How stable your typing speed was throughout the test
- **Chart Analysis**: Visual representation of your performance over time

### Customization

- **Theme Toggle**: Switch between light and dark modes
- **Timer Settings**: Adjust test duration to your preference
- **Reset/Restart**: Start a new test anytime with fresh words

## Features in Detail

### Smart Typing Protection

TypeMonkey includes an innovative focus protection system:

- **Automatic focus retention** when actively typing
- **Mouse event blocking** outside the typing area
- **Visual indicators** when protection is active
- **Seamless transition** back to normal mode when you stop typing

### Advanced Analytics Engine

The application uses sophisticated algorithms for accurate measurements:

- **Kalman filtering** for smooth real-time data
- **Statistical analysis** for consistency scoring
- **Performance trending** throughout the typing session
- **Mistake pattern recognition** and visualization

### Performance Optimization

- **Memoized components** for efficient rendering
- **Smooth cursor animation** with requestAnimationFrame
- **Efficient event handling** with proper cleanup
- **Optimized re-renders** for real-time updates

## Themes

TypeMonkey supports both light and dark themes with:

- **System preference detection**
- **Manual theme switching**
- **Consistent color variables** throughout the app
- **Smooth theme transitions**

## Data Processing

The app processes typing data in real-time:

- **Character-level accuracy** tracking
- **Word completion timing**
- **Mistake categorization**
- **Speed fluctuation analysis**
- **Consistency measurements** using standard deviation

## Development

### Project Structure

```text
app/
├── components/          # React components
│   ├── typingBox.tsx   # Main typing interface
│   ├── timer.tsx       # Timer functionality
│   ├── chart.tsx       # Performance charts
│   ├── results.tsx     # Results display
│   ├── navbar.tsx      # Navigation
│   └── ...            # Other components
├── lib/                # Utility functions
├── globals.css         # Global styles
└── page.tsx           # Main page component
```

### Key Components

- **TypingBox**: Core typing interface with real-time processing
- **Timer**: Countdown timer with performance snapshots
- **Chart**: Interactive performance visualization
- **Results**: Comprehensive statistics display
- **Bar**: Settings and mode selection

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Maintain component purity and reusability
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation when needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by MonkeyType for the typing test concept
- Built with modern web technologies for optimal performance
- Thanks to the open-source community for the amazing tools and libraries

---

## Happy Typing

For issues, feature requests, or questions, please open an issue on the repository.
