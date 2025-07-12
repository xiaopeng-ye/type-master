# Type Master

A modern, responsive typing test application built with React 19, TypeScript, and Tailwind CSS. Test your typing speed and accuracy with a clean, distraction-free interface.

## Features

- **Multiple Timer Modes**: Choose between 15, 30, or 60-second typing tests
- **Real-time Statistics**: Live WPM (Words Per Minute) and accuracy tracking
- **Dark/Light Theme**: Toggle between themes for comfortable typing in any environment
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Random Text Generation**: Dynamic word selection for varied typing challenges
- **Detailed Results**: Comprehensive statistics display after each test

<!--## Demo [Live Demo](demo-url) -->

<!-- ## Screenshots -->

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/type-master.git
cd type-master
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Timer.tsx          # Timer component with mode selection
│   ├── TypingArea.tsx     # Main typing interface
│   ├── TypingTest.tsx     # Root test component
│   └── ...
├── hooks/
│   ├── useTyping.ts       # Core typing logic
│   ├── useTheme.ts        # Theme management
│   └── useToast.ts        # Toast notifications
├── data/
│   └── wordBank.ts        # Text generation
├── types/
│   └── typing.ts          # TypeScript definitions
└── lib/
    └── utils.ts           # Utility functions
```

## How It Works

1. **Select Timer**: Choose your preferred test duration (15s, 30s, or 60s)
2. **Start Typing**: Click in the text area and begin typing the displayed text
3. **Real-time Feedback**: Watch your WPM and accuracy update as you type
4. **View Results**: See detailed statistics when the timer ends

## Features in Detail

### Typing Statistics
- **WPM Calculation**: `(correct characters / 5) / (time elapsed in minutes)`
- **Accuracy**: Percentage of correctly typed characters
- **Error Tracking**: Real-time highlighting of mistakes

### Theme Support
- Automatic dark/light mode detection
- Manual theme toggle
- Persistent theme preference

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide](https://lucide.dev/) for the icon set

## Support

If you found this project helpful, please give it a ⭐ on GitHub!

For questions or support, please open an issue on GitHub.
