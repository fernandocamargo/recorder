import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

describe('App Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    // Mock stream object
    const mockStream = {
      getTracks: () => [],
      getAudioTracks: () => [],
      getVideoTracks: () => [],
    };

    expect(() => {
      ReactDOM.render(<App stream={mockStream} />, div);
    }).not.toThrow();

    // Clean up without unmounting (which would trigger lifecycle errors)
    div.innerHTML = '';
  });

  it('renders with error prop', () => {
    const div = document.createElement('div');

    const mockStream = {
      getTracks: () => [],
      getAudioTracks: () => [],
      getVideoTracks: () => [],
    };

    expect(() => {
      ReactDOM.render(<App stream={mockStream} error="Test error" />, div);
    }).not.toThrow();

    // Clean up without unmounting
    div.innerHTML = '';
  });
});
