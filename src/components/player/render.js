import React from 'react';

export default ({ source, onEnded, sync }) =>
  source && (
    <div className="player">
      <audio src={source} onEnded={onEnded} ref={sync} autoPlay />
    </div>
  );
