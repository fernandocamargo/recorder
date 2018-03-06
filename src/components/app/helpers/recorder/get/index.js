import use from 'helpers/function/use';
import attribute from 'helpers/object/attribute';
import * as MediaRecorder from 'helpers/media-recorder';

export default ({ records, current, stream, updateRecording }) =>
  Promise.resolve(
    (
      records[current] || {
        recorder: MediaRecorder.create({
          ondataavailable: use(attribute('data')).to(updateRecording),
          stream,
        }),
      }
    ).recorder,
  );

