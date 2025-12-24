# Audio Recorder Web Application

> A production-ready, responsive browser-based audio recording application built with React 16.2 and the MediaRecorder API

**Live Demo**: [https://fernandocamargo.com/recorder/](https://fernandocamargo.com/recorder/)

**Development Period**: February - March 2018

---

## Table of Contents

- [Overview](#overview)
- [Project Context & Historical Significance](#project-context--historical-significance)
- [Requirements Specification](#requirements-specification)
- [Technical Implementation](#technical-implementation)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Technology Stack](#technology-stack)
- [Setup & Installation](#setup--installation)
- [Browser Support](#browser-support)
- [Project Structure](#project-structure)

---

## Overview

This application demonstrates a complete implementation of a browser-based audio recording solution using modern web APIs. The project showcases proficiency in functional programming patterns, state management, responsive design, and integration with native browser APIs.

### Key Features

- Real-time audio recording using the MediaRecorder API
- Audio playback with progress tracking
- Responsive design supporting both desktop and mobile devices
- Progressive Web App (PWA) capabilities with service worker
- Clean, accessible user interface with smooth animations
- Immutable state management with predictable state transitions

---

## Project Context & Historical Significance

### React Ecosystem Timeline (2018)

This project was developed during a pivotal period in React's evolution:

**Development Timeline**:
- **February 27, 2018**: Initial commit
- **March 6, 2018**: Production release
- **React Version**: 16.2.0 (Released November 2017)

**Historical Context**:

1. **Pre-Hooks Era**: This project was built **8-9 months before React Hooks were announced** (October 2018). React Hooks wouldn't be released until React 16.8 in February 2019.

2. **Recompose at Its Peak**: [Recompose](https://github.com/acdlite/recompose) was the industry-standard solution for functional component composition. The library's creator, Andrew Clark, had already joined the React core team and would later create Hooks to solve the same problems that Recompose addressed.

3. **Functional Components Pattern**: While class components dominated stateful logic, this project demonstrates the advanced functional programming approach that was emerging as best practice for those seeking cleaner, more composable code.

4. **HOC Composition**: Higher-Order Components (HOCs) were the recommended pattern for reusing component logic. This project exemplifies the sophisticated use of HOC composition through Recompose.

5. **State Management Landscape**:
   - Redux dominated for complex state management
   - Context API existed but was discouraged for frequent updates
   - This project demonstrates a lightweight alternative using Recompose's `withStateHandlers`

### Architectural Decisions in Context

The architectural choices made in this project reflect the best practices and constraints of early 2018:

- **No Hooks**: `useState`, `useEffect`, `useReducer` didn't exist yet
- **Functional Components**: Forward-thinking choice when class components were standard
- **Recompose HOCs**: Industry best practice for functional component composition
- **Immutability Helper**: Common pattern for Redux-style reducers outside of Redux
- **Create React App**: De facto standard for React tooling and build configuration

---

## Requirements Specification

### Functional Requirements

Based on the design specifications provided in `/guideline/mocks/`:

#### 1. Audio Recording
- Request microphone access on application load
- Start/stop audio recording via interactive button
- Visual feedback during recording (animated UI state transitions)
- Record duration counter during active recording

#### 2. Audio Playback
- Play/pause recorded audio
- Visual progress indicator
- Playback duration display
- Automatic UI state management

#### 3. User Interface States

**State 1: Initial/Empty** (`Desktop_1@2x.jpg`, `Mobile_1@2x.jpg`)
- Default state before any recording
- Single record button prominently displayed
- Instructional text: "Click to record & read the text"
- Play button disabled

**State 2: Recording** (`Desktop_2@2x.jpg`, `Mobile_2@2x.jpg`)
- Recording indicator animation
- Timer displaying recording duration
- Record button transforms to stop button
- Background color transitions

**State 3: Recorded/Ready** (`Desktop_3@2x.jpg`, `Mobile_3@2x.jpg`)
- Both record and play buttons visible
- Duration of recording displayed
- Content area becomes interactive
- Visual state indicates available actions

**State 4: Playing** (`Desktop_4@2x.jpg`, `Mobile_4@2x.jpg`)
- Play button transforms to pause button
- Progress counter updates during playback
- Recording disabled during playback

#### 4. Responsive Design
- Mobile-first approach
- Breakpoint at 770px for desktop layout
- Touch-friendly interface for mobile devices
- Consistent behavior across viewport sizes

#### 5. Error Handling
- Display error messages when microphone access is denied
- Visual overlay disabling interaction when errors occur
- User-friendly error message formatting

#### 6. Browser Compatibility
- Chrome 64.0+ (requires HTTPS/SSL for MediaRecorder API)
- Firefox 58.0+

---

## Technical Implementation

### Core Technologies & Native APIs

#### 1. MediaRecorder API

The application leverages the native [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) for audio capture:

**Implementation** (`src/helpers/media-recorder/create/index.js`):
```javascript
export default ({ stream, ondataavailable }) =>
  Object.assign(new MediaRecorder(stream), {
    ondataavailable,
  });
```

**Key Features**:
- Captures audio from `getUserMedia` stream
- Chunks audio data into manageable `Blob` segments
- Event-driven architecture for data availability
- Browser-native compression and encoding

#### 2. MediaStream API (getUserMedia)

**Implementation** (`src/index.js:18-22`):
```javascript
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(stream => render({ stream }))
  .catch(({ message }) => render({ error: message }))
  .then(boost);
```

**Capabilities**:
- Request microphone access with user permission
- Stream audio input to MediaRecorder
- Error handling for permission denial
- Promise-based asynchronous flow

#### 3. Blob API & Object URLs

**Implementation** (`src/components/app/helpers/media/get/index.js`):
```javascript
export default ({ playing, records, current }) =>
  playing && URL.createObjectURL(new Blob(records[current].chunks));
```

**Purpose**:
- Construct playable audio from recorded chunks
- Create temporary URLs for `<audio>` element source
- Memory-efficient media handling

#### 4. Service Worker API

**PWA Implementation** (`src/registerServiceWorker.js`):
- Offline capability through service worker registration
- Asset caching for improved performance
- Progressive Web App features

---

## Architecture & Design Patterns

### 1. Higher-Order Component (HOC) Composition

The application uses Recompose to build components through HOC composition, a functional programming pattern for component enhancement.

**App Component Composition Pipeline** (`src/components/app/composition.js`):

```javascript
export default compose(
  withStateHandlers(initialState, reducers),
  withProps(props),
  lifecycle(events),
);
```

**Pipeline Breakdown**:

1. **`withStateHandlers`**: Injects state and state updaters (similar to `useState` + `useReducer`)
2. **`withProps`**: Derives computed properties from state (similar to `useMemo`)
3. **`lifecycle`**: Adds lifecycle methods (similar to `useEffect`)

**Benefits**:
- Pure functional components (no classes)
- Composable, reusable logic
- Clear separation of concerns
- Testable in isolation

### 2. Flux-Like State Management

The application implements a unidirectional data flow pattern inspired by Redux, without the Redux library.

**State Structure** (`src/components/app/initial-state.js`):

```javascript
{
  empty: true,           // No recordings yet
  recording: false,      // Currently recording
  playing: false,        // Currently playing
  current: null,         // UUID of current recording
  records: {},           // Map of UUID -> {recorder, chunks, duration}
  progress: 0,           // Playback progress in seconds
  timer: null            // setInterval reference
}
```

**State Update Pattern** (`src/components/app/reducers.js`):

```javascript
export const startRecording = state => ({ uuid, recorder }) =>
  update(state, {
    progress: { $set: 0 },
    recording: { $set: true },
    current: { $set: uuid },
    records: { [uuid]: { $set: { recorder, chunks: [], duration: 0 } } },
  });
```

**Key Characteristics**:
- Immutable updates using `immutability-helper`
- MongoDB-style update syntax (`$set`, `$push`, `$apply`)
- Predictable state transitions
- Single source of truth

### 3. Command Pattern for User Actions

User interactions are abstracted into command functions that encapsulate business logic.

**Command Composition** (`src/components/app/props.js`):

```javascript
export default props => ({
  record: () =>
    Recorder.get(props).then(
      recording ? Recorder.stop(props) : Recorder.start(props),
    ),
  play: () => (playing ? pausePlaying() : startPlaying(increaseProgress)),
});
```

**Advantages**:
- Decouples UI from business logic
- Testable command functions
- Encapsulates complex state transitions
- Promise-based asynchronous handling

### 4. Functional Utilities Pattern

Small, composable utility functions for common operations.

**Example: Curried Function Utility** (`src/helpers/function/use/index.js`):

```javascript
export default fn => ({
  to: callback => (...args) => callback(fn(...args)),
});
```

**Usage**:
```javascript
use(attribute('data')).to(updateRecording)
// Transforms: event => updateRecording(event.data)
```

### 5. Presenter/Container Pattern

Components are split into pure presentational (render) and container (logic) responsibilities.

**Example Structure**:
```
components/app/
├── index.js         # Container: Composes logic
├── composition.js   # Logic: State, props, lifecycle
├── render.js        # Presenter: Pure UI rendering
├── reducers.js      # State transformations
├── props.js         # Computed properties
└── events.js        # Side effects
```

### 6. Module Pattern for Organization

Each helper/feature is self-contained with a clear public interface.

**Example**: `src/components/app/helpers/recorder/`
```
recorder/
├── get/index.js     # Get or create recorder instance
├── start/index.js   # Start recording
└── stop/index.js    # Stop recording
```

---

## Technology Stack

### Core Dependencies

#### React Ecosystem
- **react** `^16.2.0` - UI library
- **react-dom** `^16.2.0` - DOM rendering
- **react-scripts** `1.1.1` - Create React App tooling (Webpack, Babel, Jest)

#### Functional Programming
- **recompose** `^0.26.0` - Higher-Order Component utilities
  - `compose`: Function composition
  - `withStateHandlers`: Local state management
  - `withProps`: Computed properties
  - `lifecycle`: Lifecycle methods for functional components

#### State Management
- **immutability-helper** `^2.6.5` - Immutable state updates
  - MongoDB-style update operations
  - Used in reducers for predictable state transitions
  - Alternative to Immutable.js with simpler API

#### Utilities
- **classnames** `^2.2.5` - Dynamic CSS class composition
  - Conditional class application
  - Clean className construction
- **prop-types** `^15.6.1` - Runtime type checking
  - Component prop validation
  - Development-time warnings

### Build Tools & Configuration

- **Create React App** `1.1.1` - Zero-configuration build setup
  - Webpack 3.x
  - Babel 6.x
  - Jest for testing
  - ESLint for linting
  - PostCSS with Autoprefixer
  - Development server with hot reloading

### CSS Strategy

- **Plain CSS** with CSS Custom Properties (CSS Variables)
- **BEM-like naming conventions** for component styles
- **Mobile-first responsive design** with media queries
- **Google Fonts**: Mada (Regular & Bold)

### Browser APIs Used

1. **MediaRecorder API** - Audio recording
2. **MediaStream API** - Microphone access (`getUserMedia`)
3. **Blob API** - Binary data handling
4. **URL API** - Object URL creation (`createObjectURL`)
5. **Service Worker API** - PWA offline support
6. **localStorage** - (via service worker for caching)

---

## Setup & Installation

### Prerequisites

- **Node.js**: v8.x or higher (LTS recommended)
- **npm**: v5.x or higher (or yarn v1.x)
- **Modern browser** with MediaRecorder API support

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recorder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment** (optional)

   The project uses absolute imports via `.env`:
   ```env
   NODE_PATH=src/
   ```

### Available Scripts

#### Development Mode

```bash
npm start
```

**Features**:
- Runs development server on `http://localhost:3000`
- Hot module replacement (HMR)
- Live error reporting
- ESLint warnings in console

**Note**: For MediaRecorder API testing in Chrome, you may need to use HTTPS. Consider using:
- `ngrok` or similar tunneling service
- Self-signed certificate for localhost
- Test in Firefox (supports MediaRecorder on HTTP localhost)

#### Production Build

```bash
npm run build
```

**Output**:
- Optimized bundle in `build/` directory
- Minified JavaScript and CSS
- Hashed filenames for cache busting
- Service worker for offline support
- Source maps for debugging

**Build Artifacts**:
```
build/
├── static/
│   ├── css/
│   │   └── main.[hash].css
│   ├── js/
│   │   ├── main.[hash].js
│   │   └── [chunk].[hash].chunk.js
│   └── media/
│       └── [fonts, svgs, images]
├── index.html
└── service-worker.js
```

#### Testing

```bash
npm test
```

**Test Runner**: Jest with jsdom environment
- Watch mode by default
- Coverage reports with `--coverage` flag

#### Eject Configuration

```bash
npm run eject
```

**Warning**: This is a one-way operation. Ejecting exposes:
- Webpack configuration
- Babel configuration
- ESLint configuration
- All build scripts

---

## Browser Support

### Minimum Versions

| Browser | Version | Notes |
|---------|---------|-------|
| **Chrome** | 64.0.3282.186+ | **Requires HTTPS/SSL** for MediaRecorder API |
| **Firefox** | 58.0.2+ | Works on HTTP localhost |

### MediaRecorder API Compatibility

The MediaRecorder API has specific requirements:

1. **Chrome/Chromium-based browsers**:
   - Requires secure context (HTTPS or localhost)
   - MediaRecorder API available since Chrome 47
   - Tested version: 64.0+

2. **Firefox**:
   - Works on both HTTP and HTTPS
   - MediaRecorder API available since Firefox 25
   - Tested version: 58.0+

3. **Not Supported**:
   - Safari (as of March 2018)
   - Internet Explorer
   - Edge Legacy (pre-Chromium)

### Progressive Enhancement

The application gracefully handles unsupported browsers:

1. Microphone permission denial displays error message
2. Unsupported browsers receive getUserMedia error
3. UI overlay disables interaction when errors occur

---

## Project Structure

```
recorder/
├── public/                          # Static assets
│   ├── index.html                  # HTML template
│   ├── favicon.ico                 # Favicon
│   └── manifest.json               # PWA manifest
│
├── guideline/                       # Design specifications
│   ├── mocks/                      # UI mockups
│   │   ├── desktop/                # Desktop designs
│   │   │   ├── Desktop_1@2x.jpg   # Initial state
│   │   │   ├── Desktop_2@2x.jpg   # Recording state
│   │   │   ├── Desktop_3@2x.jpg   # Recorded state
│   │   │   ├── Desktop_4@2x.jpg   # Playing state
│   │   │   └── animation.gif      # Interaction flow
│   │   └── mobile/                 # Mobile designs
│   │       ├── Mobile_1@2x.jpg
│   │       ├── Mobile_2@2x.jpg
│   │       ├── Mobile_3@2x.jpg
│   │       ├── Mobile_4@2x.jpg
│   │       └── animation-mobile.gif
│   ├── redlines/                   # Measurement guides
│   └── assets/                     # Design assets
│       ├── font/                   # Mada font files
│       └── icons/                  # SVG icons
│
├── src/                            # Source code
│   ├── index.js                   # Application entry point
│   ├── registerServiceWorker.js   # PWA service worker
│   │
│   ├── components/                # React components
│   │   ├── app/                   # Main app container
│   │   │   ├── index.js          # Component export
│   │   │   ├── composition.js    # HOC composition pipeline
│   │   │   ├── render.js         # Presentational component
│   │   │   ├── initial-state.js  # Default state shape
│   │   │   ├── reducers.js       # State updater functions
│   │   │   ├── props.js          # Computed properties
│   │   │   ├── events.js         # Lifecycle handlers
│   │   │   ├── statics.js        # Static properties
│   │   │   └── helpers/          # App-specific helpers
│   │   │       ├── recorder/     # Recording logic
│   │   │       │   ├── get/      # Get recorder instance
│   │   │       │   ├── start/    # Start recording
│   │   │       │   └── stop/     # Stop recording
│   │   │       ├── media/        # Media URL creation
│   │   │       │   └── get/
│   │   │       └── counter/      # Timer formatting
│   │   │           └── get/
│   │   │
│   │   ├── brand/                # Header brand component
│   │   ├── warning/              # Error message display
│   │   ├── content/              # Main content area
│   │   ├── controls/             # Control buttons container
│   │   ├── control/              # Individual control button
│   │   └── player/               # Audio player component
│   │
│   ├── helpers/                  # Global utility functions
│   │   ├── function/             # Function utilities
│   │   │   └── use/              # Currying utility
│   │   ├── media-recorder/       # MediaRecorder factory
│   │   │   └── create/
│   │   ├── number/               # Number utilities
│   │   │   └── increase/         # Increment function
│   │   ├── object/               # Object utilities
│   │   │   └── attribute/        # Property getter
│   │   ├── rendering/            # React rendering helpers
│   │   │   └── clone/
│   │   └── time/                 # Time utilities
│   │       ├── format/           # Format seconds to MM:SS
│   │       └── parse/            # Parse time values
│   │
│   └── assets/                   # Static assets
│       ├── css/                  # Stylesheets
│       │   ├── theme.css         # Main application styles
│       │   └── cssreset-min.css  # CSS reset
│       └── svg/                  # SVG icons
│           ├── logo.svg          # Brand logo
│           ├── record.svg        # Record icon
│           ├── stop.svg          # Stop icon
│           ├── play.svg          # Play icon
│           └── pause.svg         # Pause icon
│
├── .env                          # Environment configuration
├── .editorconfig                 # Editor settings
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies & scripts
└── README.md                     # Documentation
```

### Directory Organization Principles

1. **Feature-based structure**: Components include their logic, styles, and sub-components
2. **Helpers separation**: Reusable utilities separated from component logic
3. **Assets by type**: CSS, SVGs, and other static assets grouped by category
4. **Flat helpers**: Global utilities organized by category in flat structure
5. **Index.js exports**: Clean public API for each module

---

## Design Patterns & Software Engineering Concepts

### 1. Composition Over Inheritance

The entire application is built using composition patterns rather than inheritance:

**HOC Composition**:
```javascript
compose(
  withStateHandlers(initialState, reducers),
  withProps(props),
  lifecycle(events),
)(RenderComponent)
```

**Functional Composition**:
```javascript
use(attribute('data')).to(updateRecording)
```

### 2. Single Responsibility Principle

Each module has a single, well-defined responsibility:

- **Reducers**: Only transform state
- **Props**: Only compute derived data
- **Events**: Only handle side effects
- **Helpers**: Only perform specific utility operations

### 3. Pure Functions

Majority of the codebase consists of pure functions:

```javascript
// Pure: Same input always produces same output
export default ({ playing, records, current }) =>
  playing && URL.createObjectURL(new Blob(records[current].chunks));
```

**Benefits**:
- Predictable behavior
- Easy to test
- No hidden side effects
- Memoization-friendly

### 4. Immutability

All state updates are immutable:

```javascript
update(state, {
  recording: { $set: true },
  records: { [uuid]: { $set: { recorder, chunks: [] } } },
});
```

**Benefits**:
- Prevents accidental mutations
- Enables time-travel debugging
- React optimization through reference equality
- Easier reasoning about state changes

### 5. Separation of Concerns

Clear boundaries between different aspects:

- **Presentation**: `render.js` (UI only)
- **Logic**: `composition.js` (behavior)
- **State**: `reducers.js` (transformations)
- **Side Effects**: `events.js` (lifecycle)

### 6. Dependency Injection

HOCs inject dependencies through props:

```javascript
withStateHandlers(initialState, reducers)
// Injects: state values + state updater functions

withProps(props)
// Injects: computed properties derived from state
```

### 7. Factory Pattern

MediaRecorder creation uses factory pattern:

```javascript
export default ({ stream, ondataavailable }) =>
  Object.assign(new MediaRecorder(stream), {
    ondataavailable,
  });
```

### 8. Command Pattern

User actions encapsulated as commands:

```javascript
record: () => Recorder.get(props).then(
  recording ? Recorder.stop(props) : Recorder.start(props)
)
```

### 9. Observer Pattern

Event-driven architecture for MediaRecorder:

```javascript
MediaRecorder.create({
  ondataavailable: use(attribute('data')).to(updateRecording),
  stream,
})
```

### 10. Module Pattern

Each feature is self-contained with clear exports:

```javascript
// Public interface
export { default as get } from './get';
export { default as start } from './start';
export { default as stop } from './stop';
```

---

## Key Learnings & Portfolio Highlights

### Technical Achievements

1. **Advanced Functional Programming**: Demonstrates mastery of HOC composition, currying, and pure functional patterns in React

2. **Native API Integration**: Successfully integrated complex browser APIs (MediaRecorder, MediaStream) with React component lifecycle

3. **State Management**: Implemented Redux-like patterns without Redux, showing understanding of state management fundamentals

4. **Responsive Design**: Mobile-first approach with smooth animations and state transitions

5. **Progressive Web App**: Service worker implementation for offline capability

### Problem-Solving Examples

1. **Binary Data Handling**: Collecting audio chunks and converting to playable Blob URLs
2. **Async State Management**: Managing promises with state updates in functional components
3. **Timer Management**: Implementing progress tracking with setInterval cleanup
4. **Memory Management**: Proper cleanup of MediaRecorder instances and object URLs

### Code Quality

- **Modular Architecture**: Clear separation of concerns
- **Testability**: Pure functions and dependency injection
- **Maintainability**: Well-organized directory structure
- **Documentation**: Comprehensive inline documentation

---

## Sources & References

### React & Recompose

- [React 16.x Roadmap](https://legacy.reactjs.org/blog/2018/11/27/react-16-roadmap.html)
- [How to migrate from Recompose to React Hooks](https://medium.com/stationfive/how-to-migrate-from-recompose-to-react-hooks-89b2981c03d)
- [Why we decided to replace Recompose with React Hooks](https://www.rainforestqa.com/blog/2020-03-09-replacing-recompose-with-react-hooks)

### Browser APIs

- [MediaRecorder API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [getUserMedia - MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

---

## License

This project is licensed under the terms specified in the LICENSE file.

---

## Author

**Fernando Camargo**

Portfolio: [https://fernandocamargo.com](https://fernandocamargo.com)

---

**Built with React 16.2 • Developed in February-March 2018**
