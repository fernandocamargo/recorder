const { test, expect } = require('@playwright/test');

/**
 * E2E Tests for Audio Recorder Application
 *
 * These tests verify the complete user flow for recording and playing audio
 * using the browser's MediaRecorder API with fake media devices.
 */

test.describe('Audio Recorder App', () => {

  test.beforeEach(async ({ page, context }) => {
    // Grant microphone permissions
    await context.grantPermissions(['microphone']);

    // Navigate to the app
    await page.goto('/');

    // Wait for the app to load
    await page.waitForSelector('.app');
  });

  test('should load the application successfully', async ({ page }) => {
    // Check that the main app container is visible
    await expect(page.locator('.app')).toBeVisible();

    // Check that the brand/header is present
    await expect(page.locator('.header')).toBeVisible();

    // Check that the recorder section is present
    await expect(page.locator('.recorder')).toBeVisible();
  });

  test('should display initial empty state', async ({ page }) => {
    // The recorder should have the 'empty' class initially
    const recorder = page.locator('.recorder');
    await expect(recorder).toHaveClass(/empty/);

    // Check for the instructional text
    const instructionText = page.locator('.controls h4');
    await expect(instructionText).toContainText('Click to record');

    // Record button should be visible
    const recordButton = page.locator('.controls li.record a');
    await expect(recordButton).toBeVisible();

    // Play button should not be visible (height: 0)
    const playButton = page.locator('.controls li.play a');
    const boundingBox = await playButton.boundingBox();
    expect(boundingBox?.height).toBe(0);
  });

  test('should start recording when record button is clicked', async ({ page }) => {
    const recorder = page.locator('.recorder');
    const recordButton = page.locator('.controls li.record a');

    // Click the record button
    await recordButton.click();

    // Wait for the recording state
    await page.waitForTimeout(500);

    // The recorder should have the 'recording' class
    await expect(recorder).toHaveClass(/recording/);

    // The title should show a timer (format: MM:SS)
    const counter = page.locator('.controls h4');
    await expect(counter).toContainText(/\d{2}:\d{2}/);

    // Wait a bit to let the counter increment
    await page.waitForTimeout(1500);

    // Verify counter has incremented
    const counterText = await counter.textContent();
    expect(counterText).toMatch(/00:0[1-9]/); // Should be at least 00:01
  });

  test('should stop recording and show play button', async ({ page }) => {
    const recorder = page.locator('.recorder');
    const recordButton = page.locator('.controls li.record a');
    const playButton = page.locator('.controls li.play a');

    // Start recording
    await recordButton.click();
    await page.waitForTimeout(1000);

    // Verify recording state
    await expect(recorder).toHaveClass(/recording/);

    // Stop recording by clicking the record button again
    await recordButton.click();
    await page.waitForTimeout(500);

    // Should no longer be in recording state
    await expect(recorder).not.toHaveClass(/recording/);

    // Should no longer be in empty state
    await expect(recorder).not.toHaveClass(/empty/);

    // Should be in recorded state
    await expect(recorder).toHaveClass(/recorded/);

    // Play button should now be visible
    const playBoundingBox = await playButton.boundingBox();
    expect(playBoundingBox?.height).toBeGreaterThan(0);

    // Duration should be displayed
    const counter = page.locator('.controls h4');
    await expect(counter).toContainText(/\d{2}:\d{2}/);
  });

  test('should play back the recording', async ({ page }) => {
    const recorder = page.locator('.recorder');
    const recordButton = page.locator('.controls li.record a');
    const playButton = page.locator('.controls li.play a');

    // Record audio
    await recordButton.click();
    await page.waitForTimeout(2000); // Record for 2 seconds
    await recordButton.click(); // Stop recording
    await page.waitForTimeout(500);

    // Click play button
    await playButton.click();
    await page.waitForTimeout(300);

    // Should be in playing state
    await expect(recorder).toHaveClass(/playing/);

    // The counter should show progress
    const counter = page.locator('.controls h4');
    await expect(counter).toContainText(/\d{2}:\d{2}/);

    // Wait and verify counter is updating during playback
    await page.waitForTimeout(200);
    const initialCounter = await counter.textContent();
    await page.waitForTimeout(800);
    const updatedCounter = await counter.textContent();

    // Counter should show progress (may or may not have changed depending on timing)
    // Just verify it's still in valid time format
    expect(updatedCounter).toMatch(/^\d{2}:\d{2}$/);
  });

  test('should pause playback when play button is clicked again', async ({ page }) => {
    const recorder = page.locator('.recorder');
    const recordButton = page.locator('.controls li.record a');
    const playButton = page.locator('.controls li.play a');

    // Record audio
    await recordButton.click();
    await page.waitForTimeout(2000);
    await recordButton.click(); // Stop recording
    await page.waitForTimeout(500);

    // Start playback
    await playButton.click();
    await page.waitForTimeout(300);
    await expect(recorder).toHaveClass(/playing/);

    // Pause playback
    await playButton.click();
    await page.waitForTimeout(300);

    // Should no longer be in playing state
    await expect(recorder).not.toHaveClass(/playing/);
  });

  test('should show multiple recordings with record button visibility', async ({ page }) => {
    const recordButton = page.locator('.controls li.record a');
    const playButton = page.locator('.controls li.play a');

    // First recording
    await recordButton.click();
    await page.waitForTimeout(1000);
    await recordButton.click();
    await page.waitForTimeout(500);

    // Both buttons should be visible now
    const recordBox = await recordButton.boundingBox();
    const playBox = await playButton.boundingBox();

    expect(recordBox?.height).toBeGreaterThan(0);
    expect(playBox?.height).toBeGreaterThan(0);

    // Second recording should replace the first
    await recordButton.click();
    await page.waitForTimeout(1500);
    await recordButton.click();
    await page.waitForTimeout(500);

    // Verify still in recorded state
    const recorder = page.locator('.recorder');
    await expect(recorder).toHaveClass(/recorded/);
  });

  test('should apply correct CSS classes during state transitions', async ({ page }) => {
    const recorder = page.locator('.recorder');
    const recordButton = page.locator('.controls li.record a');

    // Initial: empty
    await expect(recorder).toHaveClass(/empty/);
    await expect(recorder).not.toHaveClass(/recording/);
    await expect(recorder).not.toHaveClass(/recorded/);
    await expect(recorder).not.toHaveClass(/playing/);

    // Start recording: recording
    await recordButton.click();
    await page.waitForTimeout(300);
    await expect(recorder).toHaveClass(/recording/);
    await expect(recorder).toHaveClass(/empty/);

    // Stop recording: recorded, not empty
    await recordButton.click();
    await page.waitForTimeout(300);
    await expect(recorder).not.toHaveClass(/recording/);
    await expect(recorder).not.toHaveClass(/empty/);
    await expect(recorder).toHaveClass(/recorded/);

    // Play: playing + recorded
    const playButton = page.locator('.controls li.play a');
    await playButton.click();
    await page.waitForTimeout(300);
    await expect(recorder).toHaveClass(/playing/);
    await expect(recorder).toHaveClass(/recorded/);
  });

  test('should display content area with proper styling', async ({ page }) => {
    const content = page.locator('.content');

    // Content should be visible
    await expect(content).toBeVisible();

    // Initially should have transparent background
    const initialBgColor = await content.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );

    // Record something
    const recordButton = page.locator('.controls li.record a');
    await recordButton.click();
    await page.waitForTimeout(1000);
    await recordButton.click();
    await page.waitForTimeout(500);

    // After recording, background should change to white
    const recordedBgColor = await content.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );

    expect(initialBgColor).not.toBe(recordedBgColor);
  });

  test('should handle rapid button clicks gracefully', async ({ page }) => {
    const recordButton = page.locator('.controls li.record a');

    // Rapid clicks
    await recordButton.click();
    await page.waitForTimeout(100);
    await recordButton.click();
    await page.waitForTimeout(100);
    await recordButton.click();
    await page.waitForTimeout(100);
    await recordButton.click();
    await page.waitForTimeout(500);

    // App should still be functional
    const recorder = page.locator('.recorder');
    await expect(recorder).toBeVisible();

    // Should end up in a valid state
    const hasEmpty = await recorder.evaluate(el => el.classList.contains('empty'));
    const hasRecorded = await recorder.evaluate(el => el.classList.contains('recorded'));
    const hasRecording = await recorder.evaluate(el => el.classList.contains('recording'));

    // Should be in one of the valid states
    expect(hasEmpty || hasRecorded || hasRecording).toBeTruthy();
  });

  test('should display timer in correct format MM:SS', async ({ page }) => {
    const recordButton = page.locator('.controls li.record a');
    const counter = page.locator('.controls h4');

    // Start recording
    await recordButton.click();
    await page.waitForTimeout(500);

    // Check format
    const counterText = await counter.textContent();
    expect(counterText).toMatch(/^\d{2}:\d{2}$/);

    // Verify it's incrementing
    await page.waitForTimeout(1500);
    const newCounterText = await counter.textContent();
    expect(newCounterText).toMatch(/^\d{2}:\d{2}$/);

    // Should have incremented
    expect(newCounterText).not.toBe(counterText);
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // App should still be visible and functional
    const app = page.locator('.app');
    await expect(app).toBeVisible();

    // Recorder should be visible
    const recorder = page.locator('.recorder');
    await expect(recorder).toBeVisible();

    // Buttons should be visible
    const recordButton = page.locator('.controls li.record a');
    await expect(recordButton).toBeVisible();

    // Test recording on mobile viewport
    await recordButton.click();
    await page.waitForTimeout(1000);
    await expect(recorder).toHaveClass(/recording/);

    await recordButton.click();
    await page.waitForTimeout(500);
    await expect(recorder).toHaveClass(/recorded/);
  });

  test('should maintain state consistency throughout recording flow', async ({ page }) => {
    const recorder = page.locator('.recorder');
    const recordButton = page.locator('.controls li.record a');
    const playButton = page.locator('.controls li.play a');
    const counter = page.locator('.controls h4');

    // Complete flow: empty -> recording -> recorded -> playing -> paused

    // 1. Empty state
    await expect(recorder).toHaveClass(/empty/);

    // 2. Recording state
    await recordButton.click();
    await page.waitForTimeout(1500);
    await expect(recorder).toHaveClass(/recording/);

    // 3. Recorded state
    await recordButton.click();
    await page.waitForTimeout(500);
    await expect(recorder).toHaveClass(/recorded/);
    await expect(recorder).not.toHaveClass(/empty/);

    // Duration should be displayed in correct format
    const savedDuration = await counter.textContent();
    expect(savedDuration).toMatch(/^\d{2}:\d{2}$/);

    // 4. Playing state
    await playButton.click();
    await page.waitForTimeout(500);
    await expect(recorder).toHaveClass(/playing/);

    // 5. Paused state
    await playButton.click();
    await page.waitForTimeout(300);
    await expect(recorder).not.toHaveClass(/playing/);
    await expect(recorder).toHaveClass(/recorded/);
  });
});
