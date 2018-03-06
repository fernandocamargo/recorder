import React from 'react';

export default ({ error = false }) =>
  error && (
    <p className="error">
      <span>⚠</span>
      <strong>Error:</strong>
      <em>{error}</em>
    </p>
  );
