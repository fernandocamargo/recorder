# Audio Recorder Web Application

> A production-ready, responsive browser-based audio recording application built with React 16.2 and the MediaRecorder API

**Live Demo**: [https://fernandocamargo.com/recorder/](https://fernandocamargo.com/recorder/)

**Development Period**: February - March 2018

---

[demo.webm](https://github.com/user-attachments/assets/aab55099-7629-4c92-9ba5-4379e9e821fd)

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

## Demo

<div align="center">

<video src="https://github.com/user-attachments/assets/complete-recording-flow.webm" width="800" controls autoplay loop muted>
  <source src="./e2e/demo-videos/complete-recording-flow.webm" type="video/webm">
  Your browser does not support the video tag. <a href="./e2e/demo-videos/complete-recording-flow.webm">Download the demo video</a>.
</video>

*Complete recording flow: Empty state → Recording → Playback → Pause*

</div>

> **Note**: The demo above shows automated E2E testing with fake media devices. The [live application](https://fernandocamargo.com/recorder/) uses your real microphone.
>
> **Additional demos**: [Recording & Playback](./e2e/demo-videos/recording-and-playback.webm) • [Mobile Responsive](./e2e/demo-videos/mobile-responsive.webm)

### Key Features

- Real-time audio recording using the [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- Audio playback with progress tracking
- Responsive design supporting both desktop and mobile devices
- [Progressive Web App (PWA)](https://web.dev/progressive-web-apps/) capabilities with [service worker](./src/registerServiceWorker.js)
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

> [!IMPORTANT]
> **Recompose: The Grandfather of Modern React**
>
> [Andrew Clark](https://github.com/acdlite) ([@acdlite](https://twitter.com/acdlite)) created Recompose in 2015 to bring functional programming patterns to React. After joining the React core team at Facebook, he became one of the principal architects behind **React Hooks**, which were announced in October 2018 and released in February 2019.
>
> **Hooks directly evolved from Recompose's patterns**:
> - `withStateHandlers` → `useState` + `useReducer`
> - `withProps` → `useMemo`
> - `lifecycle` → `useEffect`
> - `compose` → Custom Hooks composition
>
> In his own words from the [Hooks RFC](https://github.com/reactjs/rfcs/pull/68#issuecomment-439314884):
>
> _"Hooks solve all the problems I attempted to address with Recompose three years ago, and more on top of that."_ — Andrew Clark
>
> This project represents **the state-of-the-art functional React patterns of 2018**, built with the very library that inspired React's future direction. Understanding this codebase provides insight into the evolutionary path from HOCs to Hooks.
>
> **Further Reading**:
> - [Introducing Hooks - React Conf 2018](https://www.youtube.com/watch?v=dpw9EHDh2bM) - Dan Abramov & Ryan Florence
> - [React Hooks RFC Discussion](https://github.com/reactjs/rfcs/pull/68) - Original proposal with Andrew Clark's comments
> - [Recompose Sunset Announcement](https://github.com/acdlite/recompose/commit/7867de653abbb57a49934e52622a60b433bda918) - Andrew Clark recommending Hooks migration
> - [The History of React Hooks](https://www.youtube.com/watch?v=V-QO-KO90iQ) - Deep dive into the evolution

3. **Functional Components Pattern**: While class components dominated stateful logic, this project demonstrates the advanced functional programming approach that was emerging as best practice for those seeking cleaner, more composable code.

4. **HOC Composition**: Higher-Order Components (HOCs) were the recommended pattern for reusing component logic. This project exemplifies the sophisticated use of HOC composition through Recompose.

5. **State Management Landscape**:
   - Redux dominated for complex state management
   - Context API existed but was discouraged for frequent updates
   - This project demonstrates a lightweight alternative using Recompose's `withStateHandlers`

### Architectural Decisions in Context

The architectural choices made in this project reflect the best practices and constraints of early 2018:

- **No Hooks**: [`useState`](https://react.dev/reference/react/useState), [`useEffect`](https://react.dev/reference/react/useEffect), [`useReducer`](https://react.dev/reference/react/useReducer) didn't exist yet
- **Functional Components**: Forward-thinking choice when [class components](https://react.dev/reference/react/Component) were standard
- **Recompose HOCs**: Industry best practice for functional component composition
- **Immutability Helper**: Common pattern for [Redux](https://redux.js.org/)-style reducers outside of Redux
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

**Implementation** ([`src/helpers/media-recorder/create/index.js`](./src/helpers/media-recorder/create/index.js)):
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

**Implementation** ([`src/index.js:18-22`](./src/index.js#L18-L22)):
```javascript
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(stream => render({ stream }))
  .catch(({ message }) => render({ error: message }))
  .then(boost);
```

**Capabilities**:
- Request microphone access with user permission via [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- Stream audio input to MediaRecorder
- Error handling for permission denial
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)-based asynchronous flow

#### 3. Blob API & Object URLs

**Implementation** ([`src/components/app/helpers/media/get/index.js`](./src/components/app/helpers/media/get/index.js)):
```javascript
export default ({ playing, records, current }) =>
  playing && URL.createObjectURL(new Blob(records[current].chunks));
```

**Purpose**:
- Construct playable audio from recorded chunks using [Blob API](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
- Create temporary URLs for `<audio>` element source via [`URL.createObjectURL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static)
- Memory-efficient media handling

#### 4. Service Worker API

**PWA Implementation** ([`src/registerServiceWorker.js`](./src/registerServiceWorker.js)):
- Offline capability through [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) registration
- Asset caching for improved performance
- [Progressive Web App](https://web.dev/progressive-web-apps/) features

---

## Architecture & Design Patterns

### 1. Higher-Order Component (HOC) Composition

The application uses [Recompose](https://github.com/acdlite/recompose) to build components through [HOC composition](https://react.dev/reference/react/Component#alternatives), a functional programming pattern for component enhancement.

**App Component Composition Pipeline** ([`src/components/app/composition.js`](./src/components/app/composition.js)):

```javascript
export default compose(
  withStateHandlers(initialState, reducers),
  withProps(props),
  lifecycle(events),
);
```

**Pipeline Breakdown**:

1. **[`withStateHandlers`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withstatehandlers)**: Injects state and state updaters (similar to [`useState`](https://react.dev/reference/react/useState) + [`useReducer`](https://react.dev/reference/react/useReducer))
2. **[`withProps`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withprops)**: Derives computed properties from state (similar to [`useMemo`](https://react.dev/reference/react/useMemo))
3. **[`lifecycle`](https://github.com/acdlite/recompose/blob/master/docs/API.md#lifecycle)**: Adds lifecycle methods (similar to [`useEffect`](https://react.dev/reference/react/useEffect))

**Benefits**:
- Pure functional components (no classes)
- Composable, reusable logic
- Clear separation of concerns
- Testable in isolation

### 2. Flux-Like State Management

The application implements a [unidirectional data flow](https://react.dev/learn/passing-data-deeply-with-context) pattern inspired by [Redux](https://redux.js.org/), without the Redux library.

**State Structure** ([`src/components/app/initial-state.js`](./src/components/app/initial-state.js)):

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

**State Update Pattern** ([`src/components/app/reducers.js`](./src/components/app/reducers.js)):

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
- Immutable updates using [`immutability-helper`](https://github.com/kolodny/immutability-helper)
- [MongoDB](https://www.mongodb.com/docs/manual/reference/operator/update/)-style update syntax ([`$set`](https://github.com/kolodny/immutability-helper#set), [`$push`](https://github.com/kolodny/immutability-helper#push), [`$apply`](https://github.com/kolodny/immutability-helper#apply))
- Predictable state transitions
- [Single source of truth](https://redux.js.org/understanding/thinking-in-redux/three-principles#single-source-of-truth)

### 3. Command Pattern for User Actions

User interactions are abstracted into command functions that encapsulate business logic using the [Command Pattern](https://refactoring.guru/design-patterns/command).

**Command Composition** ([`src/components/app/props.js`](./src/components/app/props.js)):

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

Small, composable utility functions for common operations using [currying](https://javascript.info/currying-partials) and [function composition](https://www.freecodecamp.org/news/function-composition-in-javascript/).

**Example: Curried Function Utility** ([`src/helpers/function/use/index.js`](./src/helpers/function/use/index.js)):

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

Components are split into pure [presentational and container](https://www.patterns.dev/react/presentational-container-pattern) responsibilities.

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

**Files**:
- [`src/components/app/index.js`](./src/components/app/index.js) - Component export
- [`src/components/app/composition.js`](./src/components/app/composition.js) - HOC composition
- [`src/components/app/render.js`](./src/components/app/render.js) - Presentational component
- [`src/components/app/reducers.js`](./src/components/app/reducers.js) - State reducers
- [`src/components/app/props.js`](./src/components/app/props.js) - Computed props
- [`src/components/app/events.js`](./src/components/app/events.js) - Lifecycle events

#### Zero-Logic Rendering

A critical architectural decision in this project is **keeping render functions completely free of business logic**. The render layer ([`render.js`](./src/components/app/render.js)) contains **only JSX interpolation** with zero transformations, calculations, or complex conditionals.

**Pure Presentational Render** ([`src/components/app/render.js`](./src/components/app/render.js)):

```javascript
export default ({
  error,
  empty,
  recorded,    // ✅ Computed in props.js
  record,      // ✅ Command function from props.js
  recording,
  play,        // ✅ Command function from props.js
  stopPlaying,
  playing,
  source,      // ✅ Blob URL created in props.js
  counter,     // ✅ Formatted time from props.js
  progress,
}) => (
  <div className={classnames('app', { disabled: !!error })}>
    <header className="header">
      <Brand />
      <Warning error={error} />
    </header>
    <section className={classnames('recorder', { recorded, recording, playing, empty })}>
      <Content />
      <Controls
        title={counter || 'Click to record & read the text'}
        controls={[
          { type: 'record', action: record, label: 'Record!' },
          { type: 'play', action: play, disabled: !!empty, label: 'Play!' },
        ]}
      />
      <Player playing={playing} source={source} currentTime={progress} onEnded={stopPlaying} />
    </section>
  </div>
);
```

**All Logic Happens Before Rendering** ([`src/components/app/props.js`](./src/components/app/props.js)):

```javascript
export default props => {
  const { recording, records, playing, startPlaying, pausePlaying, increaseProgress } = props;

  return {
    recorded: !!Object.keys(records).length,              // ✅ Derived boolean
    source: Media.get(props),                             // ✅ Blob URL creation
    counter: Counter.get(props),                          // ✅ Time formatting
    record: () =>                                         // ✅ Command encapsulation
      Recorder.get(props).then(
        recording ? Recorder.stop(props) : Recorder.start(props),
      ),
    play: () => (playing ? pausePlaying() : startPlaying(increaseProgress)),
  };
};
```

**Key Principles**:

1. **No Business Logic in JSX**: All calculations, transformations, and conditionals happen in [`props.js`](./src/components/app/props.js)
2. **Command Pattern**: Event handlers are pre-built command functions, not inline arrow functions
3. **Computed Properties**: Derived state like `recorded`, `source`, and `counter` are calculated before rendering
4. **Declarative Markup**: Render function reads like pure HTML/JSX without logic noise
5. **Testability**: Render function can be tested purely as JSX structure without mocking complex logic

**Benefits**:
- **Readability**: Render function is immediately understandable as UI structure
- **Maintainability**: Logic changes don't require touching JSX
- **Performance**: No function allocations or calculations during render phase
- **Separation of Concerns**: Clear boundary between "what to show" (render.js) and "what to do" (props.js)
- **Type Safety**: Props contract is explicit and verifiable

This pattern predates React Hooks but demonstrates the same [separation of concerns](https://kentcdodds.com/blog/separation-of-concerns) that modern React encourages with custom hooks for logic and functional components for presentation.

### 6. Module Pattern for Organization

Each helper/feature is self-contained with a clear public interface using the [Module Pattern](https://www.patterns.dev/vanilla/module-pattern).

**Example**: [`src/components/app/helpers/recorder/`](./src/components/app/helpers/recorder/)
```
recorder/
├── get/index.js     # Get or create recorder instance
├── start/index.js   # Start recording
└── stop/index.js    # Stop recording
```

**Files**:
- [`src/components/app/helpers/recorder/get/index.js`](./src/components/app/helpers/recorder/get/index.js)
- [`src/components/app/helpers/recorder/start/index.js`](./src/components/app/helpers/recorder/start/index.js)
- [`src/components/app/helpers/recorder/stop/index.js`](./src/components/app/helpers/recorder/stop/index.js)

---

## Technology Stack

### Core Dependencies

#### React Ecosystem
- **[react](https://www.npmjs.com/package/react/v/16.2.0)** `^16.2.0` - UI library ([docs](https://react.dev/))
- **[react-dom](https://www.npmjs.com/package/react-dom/v/16.2.0)** `^16.2.0` - DOM rendering
- **[react-scripts](https://www.npmjs.com/package/react-scripts/v/1.1.1)** `1.1.1` - [Create React App](https://create-react-app.dev/) tooling (Webpack, Babel, Jest)

#### Functional Programming
- **[recompose](https://github.com/acdlite/recompose)** `^0.26.0` - Higher-Order Component utilities ([npm](https://www.npmjs.com/package/recompose/v/0.26.0))
  - [`compose`](https://github.com/acdlite/recompose/blob/master/docs/API.md#compose): Function composition
  - [`withStateHandlers`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withstatehandlers): Local state management (precursor to `useState`/`useReducer`)
  - [`withProps`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withprops): Computed properties (precursor to `useMemo`)
  - [`lifecycle`](https://github.com/acdlite/recompose/blob/master/docs/API.md#lifecycle): Lifecycle methods for functional components (precursor to `useEffect`)

> [!NOTE]
> Recompose's author, [Andrew Clark](https://github.com/acdlite), later joined the React core team and was instrumental in designing React Hooks. The patterns you see in this codebase directly influenced modern React's architecture.

#### State Management
- **[immutability-helper](https://github.com/kolodny/immutability-helper)** `^2.6.5` - Immutable state updates ([npm](https://www.npmjs.com/package/immutability-helper/v/2.6.5))
  - [MongoDB](https://www.mongodb.com/docs/manual/reference/operator/update/)-style update operations
  - Used in [reducers](./src/components/app/reducers.js) for predictable state transitions
  - Alternative to [Immutable.js](https://immutable-js.com/) with simpler API

#### Utilities
- **[classnames](https://github.com/JedWatson/classnames)** `^2.2.5` - Dynamic CSS class composition ([npm](https://www.npmjs.com/package/classnames/v/2.2.5))
  - Conditional class application
  - Clean className construction
- **[prop-types](https://github.com/facebook/prop-types)** `^15.6.1` - Runtime type checking ([npm](https://www.npmjs.com/package/prop-types/v/15.6.1))
  - Component prop validation
  - Development-time warnings

### Build Tools & Configuration

- **[Create React App](https://create-react-app.dev/)** `1.1.1` - Zero-configuration build setup ([GitHub](https://github.com/facebook/create-react-app))
  - [Webpack](https://webpack.js.org/) 3.x
  - [Babel](https://babeljs.io/) 6.x
  - [Jest](https://jestjs.io/) for testing
  - [ESLint](https://eslint.org/) for linting
  - [PostCSS](https://postcss.org/) with [Autoprefixer](https://github.com/postcss/autoprefixer)
  - Development server with [hot reloading](https://webpack.js.org/concepts/hot-module-replacement/)

### CSS Strategy

- **Plain CSS** with [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (CSS Variables)
- **[BEM-like naming conventions](https://getbem.com/)** for component styles
- **[Mobile-first responsive design](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first)** with [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries)
- **[Google Fonts](https://fonts.google.com/specimen/Mada)**: Mada (Regular & Bold)

**Stylesheet**: [`src/assets/css/theme.css`](./src/assets/css/theme.css)

### Browser APIs Used

1. **[MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)** - Audio recording
2. **[MediaStream API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)** - Microphone access ([`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia))
3. **[Blob API](https://developer.mozilla.org/en-US/docs/Web/API/Blob)** - Binary data handling
4. **[URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL)** - Object URL creation ([`createObjectURL`](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static))
5. **[Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)** - PWA offline support
6. **[Window.setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)** - Progress tracking timer

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

This project features a comprehensive test suite with **50 total tests** following a dual-layer testing strategy:

---

### Testing Strategy

The test suite combines **unit tests** for implementation verification with **E2E tests** for user behavior verification, following [React Testing Library philosophy](https://testing-library.com/docs/guiding-principles/):

| Test Type | Purpose | Count | Tool | Philosophy |
|-----------|---------|-------|------|------------|
| **Unit Tests** | Logic & Implementation | 37 ✅ | Jest | Test isolated functions, reducers, and utilities |
| **E2E Tests** | User Behavior | 13 ✅ | Playwright | Test what users see and do, not implementation details |

**Why this approach?**

1. **Unit tests verify implementation correctness**: They test pure functions, reducers, time formatting, and state transformations in isolation
2. **E2E tests verify user experience**: They test the complete application from a user's perspective - "Can I record audio?", "Does playback work?", "Is the UI responsive?"
3. **No RTL component tests**: E2E tests already comprehensively cover user behavior. RTL component tests would be redundant and face React 16.2 + Recompose compatibility issues.

> [!NOTE]
> **React Testing Library Philosophy in E2E Tests**
>
> While this project uses React 16.2 (pre-Hooks), the E2E tests follow modern [React Testing Library principles](https://testing-library.com/docs/guiding-principles/):
> - Tests interact with the UI as users would (clicking buttons, reading text)
> - Tests verify what users see (timer display, button visibility)
> - Tests don't touch implementation details (no state inspection, no internal methods)
> - Tests use accessibility-focused selectors when possible
>
> The Playwright E2E suite serves as the user-behavior test layer that RTL typically provides for component testing.

---

### Running Tests

**Unit Tests** (Jest):
```bash
npm test
```

**Features**:
- **37 passing tests** covering:
  - State reducers (11 tests) - [`reducers.test.js`](./src/components/app/__tests__/reducers.test.js)
  - Initial state factory (10 tests) - [`initial-state.test.js`](./src/components/app/__tests__/initial-state.test.js)
  - Time formatting utilities (8 tests) - [`format.test.js`](./src/helpers/time/format/__tests__/format.test.js)
  - Number utilities (6 tests) - [`increase.test.js`](./src/helpers/number/increase/__tests__/increase.test.js)
  - Component rendering (2 tests) - [`App.test.js`](./src/App.test.js)
- Jest with jsdom environment
- Watch mode by default
- Coverage reports with `--coverage` flag

**End-to-End Tests** (Playwright):
```bash
# Run E2E tests (headless)
npm run test:e2e

# Run with visible browser
npm run test:e2e:headed

# Run with interactive UI
npm run test:e2e:ui

# View test report
npm run test:e2e:report
```

**Features**:
- **13 passing tests** covering complete user flows:
  - Initial state and UI visibility
  - Recording workflow (start, timer, stop)
  - Playback functionality (play, pause, progress)
  - State transitions and CSS classes
  - Mobile responsive design (375x667 viewport)
  - Error handling
- Automatic video recording of all test runs
- Screenshot capture on failures
- Fake media devices for consistent testing (`--use-fake-device-for-media-stream`)
- Cross-browser testing capability
- See [`e2e/README.md`](./e2e/README.md) for detailed test documentation

**Demo Videos**: Recorded test executions available in [`e2e/demo-videos/`](./e2e/demo-videos/)
- `complete-recording-flow.webm` - Full user journey (empty → record → playback)
- `recording-and-playback.webm` - Recording and playback focus
- `mobile-responsive.webm` - Mobile viewport testing

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
├── e2e/                             # End-to-end tests
│   ├── recorder.spec.js            # Playwright test suite (13 tests)
│   ├── demo-videos/                # Recorded test executions
│   │   ├── complete-recording-flow.webm
│   │   ├── recording-and-playback.webm
│   │   └── mobile-responsive.webm
│   └── README.md                   # E2E test documentation
│
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
├── playwright.config.js          # Playwright E2E test configuration
├── test-results/                 # Playwright test output (videos, screenshots)
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

The entire application is built using [composition patterns](https://react.dev/learn/thinking-in-react#step-1-break-the-ui-into-a-component-hierarchy) rather than [inheritance](https://react.dev/learn/thinking-in-react):

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

Each module has a single, well-defined responsibility following [SOLID principles](https://en.wikipedia.org/wiki/Single-responsibility_principle):

- **Reducers**: Only transform state
- **Props**: Only compute derived data
- **Events**: Only handle side effects
- **Helpers**: Only perform specific utility operations

### 3. Pure Functions

Majority of the codebase consists of [pure functions](https://en.wikipedia.org/wiki/Pure_function):

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

All state updates are [immutable](https://en.wikipedia.org/wiki/Immutable_object):

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

HOCs inject dependencies through props using [dependency injection pattern](https://en.wikipedia.org/wiki/Dependency_injection):

```javascript
withStateHandlers(initialState, reducers)
// Injects: state values + state updater functions

withProps(props)
// Injects: computed properties derived from state
```

### 7. Factory Pattern

MediaRecorder creation uses [factory pattern](https://refactoring.guru/design-patterns/factory-method):

```javascript
export default ({ stream, ondataavailable }) =>
  Object.assign(new MediaRecorder(stream), {
    ondataavailable,
  });
```

### 8. Command Pattern

User actions encapsulated as commands using [command pattern](https://refactoring.guru/design-patterns/command):

```javascript
record: () => Recorder.get(props).then(
  recording ? Recorder.stop(props) : Recorder.start(props)
)
```

### 9. Observer Pattern

Event-driven architecture for MediaRecorder using [observer pattern](https://refactoring.guru/design-patterns/observer):

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

2. **Zero-Logic Rendering**: Strict separation between presentation (render.js) and logic (props.js), with render functions containing only JSX interpolation and no business logic

3. **Native API Integration**: Successfully integrated complex browser APIs (MediaRecorder, MediaStream) with React component lifecycle

4. **State Management**: Implemented Redux-like patterns without Redux, showing understanding of state management fundamentals

5. **Responsive Design**: Mobile-first approach with smooth animations and state transitions

6. **Progressive Web App**: Service worker implementation for offline capability

### Problem-Solving Examples

1. **Binary Data Handling**: Collecting audio chunks and converting to playable Blob URLs
2. **Async State Management**: Managing promises with state updates in functional components
3. **Timer Management**: Implementing progress tracking with setInterval cleanup
4. **Memory Management**: Proper cleanup of MediaRecorder instances and object URLs

### Code Quality

- **Modular Architecture**: Clear separation of concerns with logic-free rendering
- **Testability**: Pure functions, dependency injection, and presentational/container split
- **Comprehensive Test Coverage**: 50 total tests (37 unit + 13 E2E) covering both implementation and user behavior
- **Dual-Layer Testing Strategy**: Unit tests verify logic correctness, E2E tests verify user experience following RTL philosophy
- **Automated Testing**: Playwright E2E tests with video recording and screenshot capture on failures
- **Maintainability**: Well-organized directory structure with explicit prop contracts
- **Declarative Code**: Render functions read as pure markup without logic noise
- **Documentation**: Comprehensive README, inline documentation, and test suite documentation with links to all concepts

---

## Sources & References

### React & Recompose

- [React 16.x Roadmap](https://legacy.reactjs.org/blog/2018/11/27/react-16-roadmap.html) - Official React blog post
- [Recompose GitHub Repository](https://github.com/acdlite/recompose) - Official repo and documentation by Andrew Clark
- [React Hooks RFC](https://github.com/reactjs/rfcs/pull/68) - Original Hooks proposal with Andrew Clark's insights
- [Introducing Hooks - React Conf 2018](https://www.youtube.com/watch?v=dpw9EHDh2bM) - Dan Abramov & Ryan Florence presentation
- [Recompose Sunset Announcement](https://github.com/acdlite/recompose/commit/7867de653abbb57a49934e52622a60b433bda918) - Andrew Clark on migrating to Hooks
- [How to migrate from Recompose to React Hooks](https://medium.com/stationfive/how-to-migrate-from-recompose-to-react-hooks-89b2981c03d) - Migration guide
- [Why we decided to replace Recompose with React Hooks](https://www.rainforestqa.com/blog/2020-03-09-replacing-recompose-with-react-hooks) - Case study
- [Andrew Clark's GitHub](https://github.com/acdlite) - Creator of Recompose, React core team member

### Browser APIs

- [MediaRecorder API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) - Complete API reference
- [getUserMedia - MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) - Media access documentation
- [Service Worker API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) - PWA capabilities
- [Blob API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Blob) - Binary data handling

### Design Patterns

- [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns) - Comprehensive pattern catalog
- [Patterns.dev](https://www.patterns.dev/) - Modern web app patterns
- [React Patterns](https://reactpatterns.com/) - React-specific patterns

### Tools & Libraries

- [Create React App Documentation](https://create-react-app.dev/) - Official CRA docs
- [immutability-helper on GitHub](https://github.com/kolodny/immutability-helper) - State update utilities
- [classnames on npm](https://www.npmjs.com/package/classnames) - CSS utility library

---

## License

This project is licensed under the terms specified in the LICENSE file.

---

## Author

**Fernando Camargo**

Portfolio: [https://fernandocamargo.com](https://fernandocamargo.com)

---

**Built with React 16.2 • Developed in February-March 2018**
