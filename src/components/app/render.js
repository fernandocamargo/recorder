import React from 'react';
import classnames from 'classnames';

import Brand from 'components/brand';
import Warning from 'components/warning';
import Content from 'components/content';
import Controls from 'components/controls';
import Player from 'components/player';

export default ({
  error,
  empty,
  recorded,
  record,
  recording,
  play,
  stopPlaying,
  playing,
  source,
  counter,
  progress,
}) => (
  <div className={classnames('app', { disabled: !!error })}>
    <header className="header">
      <Brand />
      <Warning error={error} />
    </header>
    <section
      className={classnames('recorder', {
        recorded,
        recording,
        playing,
        empty,
      })}
    >
      <Content />
      <Controls
        title={counter || 'Click to record & read the text'}
        controls={[
          {
            type: 'record',
            action: record,
            label: 'Record!',
          },
          {
            type: 'play',
            action: play,
            disabled: !!empty,
            label: 'Play!',
          },
        ]}
      />
      <Player
        playing={playing}
        source={source}
        currentTime={progress}
        onEnded={stopPlaying}
      />
    </section>
  </div>
);
