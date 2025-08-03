# BookmarkBuddy - Chrome Extension

An elegant bookmark manager Chrome extension that lets you manage your bookmarks efficiently and see analytics.

## 🚀 Features

- **Smart Bookmark Management**: Organize and search through your bookmarks with ease
- **Analytics Dashboard**: Track bookmark growth, popular sites, and folder distribution
- **Real-time Sync**: Automatically syncs with Chrome's native bookmark system
- **Search & Filter**: Advanced search with folder filtering capabilities
- **Tree Navigation**: Hierarchical folder browser for easy navigation
- **Dual Interface**: Popup mode for quick access and full dashboard for detailed analytics

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Chrome browser

## 🛠️ Installation & Development

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/bookmarkbuddy.git
cd bookmarkbuddy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Development
```bash
# Start development server
npm start

# Build for production (cross-platform compatible)
npm run build

# Run tests
npm test
```

## 🔧 Cross-Platform Compatibility

This project uses `cross-env` to ensure compatibility across all platforms:
- ✅ Windows
- ✅ macOS  
- ✅ Linux

The build script automatically handles environment variables correctly on all operating systems.

## 📦 Building for Chrome Extension

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Load in Chrome**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `build` folder from your project

3. **Extension will appear** in your Chrome toolbar

## 🏗️ Project Structure

```
bookmarkbuddy/
├── public/                 # Chrome extension files
│   ├── manifest.json      # Extension manifest
│   ├── background.js      # Service worker
│   └── index.html         # Popup interface
├── src/
│   ├── app/              # Core application
│   │   ├── common/       # Shared utilities & models
│   │   └── layout/       # Main app layout
│   ├── features/         # Feature modules
│   │   ├── AnalyticsCard/    # Analytics components
│   │   ├── BookmarkCard/     # Bookmark display
│   │   ├── Search/           # Search functionality
│   │   └── Treeview/         # Folder navigation
│   ├── redux/            # State management
│   ├── saga/             # Async operations
│   └── services/         # External services
└── build/               # Production build (generated)
```

## 🎯 Key Technologies

- **React 18** - Modern UI framework
- **Redux** - State management
- **Redux-Saga** - Async operations
- **Semantic UI React** - UI components
- **Nivo** - Analytics charts
- **Chrome Extension APIs** - Browser integration

## 📊 Analytics Features

- **Bookmark Growth**: Track how your bookmarks increase over time
- **Popular Sites**: See your most visited bookmark destinations
- **Folder Distribution**: Analyze your bookmark organization
- **Usage Statistics**: Track bookmark usage patterns

## 🔍 Search & Filter

- **Text Search**: Search through bookmark titles and URLs
- **Folder Filtering**: Filter bookmarks by folder
- **Combined Search**: Use both text and folder filters together
- **Real-time Results**: Instant search results as you type

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Anirban**
- **Animesh** 
- **Ayan**
- **Soham**

## 🙏 Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- UI components from [Semantic UI React](https://react.semantic-ui.com/)
- Charts powered by [Nivo](https://nivo.rocks/)
- Chrome Extension APIs for browser integration

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**BookmarkBuddy** - Making bookmark management elegant and insightful! 📚✨
