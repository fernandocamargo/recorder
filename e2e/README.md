# End-to-End Tests

Comprehensive E2E test suite for the Audio Recorder application using [Playwright](https://playwright.dev/).

## Overview

This test suite validates the complete user journey through the application, from loading the page to recording audio, playing it back, and handling various edge cases. All tests use fake media devices to ensure consistent, reliable test execution without requiring actual microphone access.

## Test Coverage

### Functional Tests (13 tests)

1. **Application Loading**
   - ✅ Application loads successfully
   - ✅ All main components render correctly
   - ✅ Initial empty state is displayed

2. **Recording Flow**
   - ✅ Record button starts recording
   - ✅ Timer displays and increments during recording
   - ✅ Stop recording transitions to recorded state
   - ✅ Multiple recordings can be created

3. **Playback Flow**
   - ✅ Play button appears after recording
   - ✅ Playback starts when play is clicked
   - ✅ Pause functionality works correctly
   - ✅ Progress counter updates during playback

4. **State Management**
   - ✅ CSS classes update correctly during state transitions
   - ✅ State consistency maintained throughout flow
   - ✅ Rapid button clicks handled gracefully

5. **UI/UX**
   - ✅ Content area styling changes appropriately
   - ✅ Timer displays in correct MM:SS format
   - ✅ Responsive design works on mobile viewport (375x667)

## Running Tests

### Prerequisites

```bash
npm install
```

### Available Commands

```bash
# Run all tests (headless mode with video recording)
npm run test:e2e

# Run tests with visible browser (headed mode)
npm run test:e2e:headed

# Run tests with interactive UI
npm run test:e2e:ui

# View HTML test report
npm run test:e2e:report
```

### Test Output

- **HTML Report**: `playwright-report/index.html`
- **Videos**: `test-results/*/video.webm`
- **Screenshots**: Captured on test failure
- **Traces**: Available for debugging failed tests

## Demo Videos

Pre-recorded videos demonstrating the application:

- **[complete-recording-flow.webm](./demo-videos/complete-recording-flow.webm)** - Full user journey from empty state through recording and playback
- **[recording-and-playback.webm](./demo-videos/recording-and-playback.webm)** - Recording audio and playing it back
- **[mobile-responsive.webm](./demo-videos/mobile-responsive.webm)** - Mobile viewport testing (375x667)

## Configuration

The test suite is configured in [`playwright.config.js`](../playwright.config.js):

### Key Settings

- **Browser**: Chromium (Desktop Chrome)
- **Viewport**: 1280x720 (desktop), 375x667 (mobile tests)
- **Video Recording**: Enabled for all tests
- **Video Resolution**: 1280x720
- **Permissions**: Microphone access granted automatically
- **Fake Devices**: Uses Chromium's fake media stream for consistent audio

### Fake Media Devices

Tests use Chromium's built-in fake media stream capabilities:

```javascript
launchOptions: {
  args: [
    '--use-fake-ui-for-media-stream',  // Auto-grant permissions
    '--use-fake-device-for-media-stream' // Use fake audio/video devices
  ]
}
```

This eliminates the need for:
- Manual permission dialogs
- Actual microphone hardware
- Real audio files

## Test Structure

### Test File Organization

```
e2e/
├── recorder.spec.js    # Main test suite
├── demo-videos/        # Pre-recorded demonstration videos
└── README.md          # This file
```

### Test Pattern

Each test follows the Arrange-Act-Assert pattern:

```javascript
test('should start recording when record button is clicked', async ({ page }) => {
  // Arrange
  const recorder = page.locator('.recorder');
  const recordButton = page.locator('.controls li.record a');

  // Act
  await recordButton.click();
  await page.waitForTimeout(500);

  // Assert
  await expect(recorder).toHaveClass(/recording/);
  await expect(counter).toContainText(/\d{2}:\d{2}/);
});
```

## Technical Details

### Locator Strategy

Tests use CSS selectors targeting class names for stability:

- `.app` - Main application container
- `.recorder` - Recording section with state classes
- `.controls li.record a` - Record button
- `.controls li.play a` - Play button
- `.controls h4` - Timer/counter display

### State Classes

The application uses CSS classes to represent state:

- `empty` - No recordings yet
- `recording` - Currently recording
- `recorded` - Has at least one recording
- `playing` - Currently playing back

### Timing Considerations

Tests include strategic waits for:
- UI animations (300-500ms)
- Recording samples (1000-2000ms)
- State transitions (500ms)

### Assertions

Common assertion patterns:

```javascript
// Class presence
await expect(recorder).toHaveClass(/recording/);

// Text content
await expect(counter).toContainText(/\d{2}:\d{2}/);

// Visibility
await expect(button).toBeVisible();

// Element dimensions (for hidden elements)
const box = await element.boundingBox();
expect(box?.height).toBeGreaterThan(0);
```

## CI/CD Integration

The test suite is CI-ready with:

- Automatic retry on failure (2 retries on CI)
- Screenshot capture on failure
- Video recording for all tests
- Trace collection for debugging
- HTML report generation

### Environment Detection

```javascript
{
  forbidOnly: !!process.env.CI,  // Prevent .only in CI
  retries: process.env.CI ? 2 : 0,  // Auto-retry on CI
  workers: process.env.CI ? 1 : undefined  // Sequential on CI
}
```

## Best Practices

### ✅ Do

- Use `page.locator()` for elements
- Wait for state changes with `await expect()`
- Use regex for flexible text matching
- Test user-visible behavior, not implementation
- Group related tests in `describe` blocks

### ❌ Don't

- Use fixed `waitForTimeout` for critical assertions
- Test internal state directly
- Hardcode timing values
- Use XPath or complex selectors
- Mix unit test logic in E2E tests

## Debugging Failed Tests

### View Failed Test Video

```bash
# Videos are in test-results/[test-name]/video.webm
open test-results/*/video.webm
```

### View Screenshot

```bash
# Screenshots captured on failure
open test-results/*/test-failed-1.png
```

### View Trace

```bash
# Open trace viewer
npx playwright show-trace test-results/*/trace.zip
```

### Run Single Test

```bash
# Run specific test by name
npx playwright test -g "should start recording"
```

### Debug Mode

```bash
# Run with debugger
npx playwright test --debug
```

## Coverage Summary

| Category | Coverage |
|----------|----------|
| **User Flows** | ✅ Complete (Record → Play → Pause) |
| **State Transitions** | ✅ All states validated |
| **Responsive Design** | ✅ Desktop + Mobile viewports |
| **Error Handling** | ⚠️ Limited (focuses on happy path) |
| **Accessibility** | ⚠️ Not explicitly tested |
| **Cross-browser** | ⚠️ Chromium only |

## Future Improvements

- [ ] Add Firefox and WebKit test coverage
- [ ] Test error states (permission denial, API failures)
- [ ] Accessibility testing (ARIA labels, keyboard navigation)
- [ ] Performance metrics collection
- [ ] Visual regression testing
- [ ] Test multiple recordings management
- [ ] Test browser compatibility warnings

## References

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [Testing Library Principles](https://testing-library.com/docs/guiding-principles/)

---

**Last Updated**: December 2024
**Playwright Version**: ^1.57.0
**Test Pass Rate**: 13/13 (100%)
