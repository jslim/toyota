/* eslint-disable sonarjs/cognitive-complexity */
import { FocusEventHandler, memo, useMemo } from 'react';
import classnames from 'classnames';
import noop from 'no-op';

import styles from './VideoControls.module.scss';

import VideoTimeline from '../VideoTimeline/VideoTimeline';
import CaptionsOffIcon from './svgs/captions-off.svg';
import CaptionsOnIcon from './svgs/captions-on.svg';
import EnterFullscreenIcon from './svgs/enter-fullscreen.svg';
import ExitFullscreenIcon from './svgs/exit-fullscreen.svg';
import MutedIcon from './svgs/muted.svg';
import PauseIcon from './svgs/pause.svg';
import PlayIcon from './svgs/play.svg';
import UnmutedIcon from './svgs/unmuted.svg';

import Cta from '@/components/Cta/Cta';

export type Props = {
  className?: string;
  duration: number;
  currentTime: number;
  onPlayToggle?: Function;
  isPlaying?: boolean;
  onTimeUpdate?: Function;
  captions?: boolean;
  isShowingCaptions?: boolean;
  onCaptionsToggle?: Function;
  isMuted?: boolean;
  onMuteToggle?: Function;
  isFullScreen?: boolean;
  onFullscreenToggle?: Function;
  navAriaLabel?: string;
  playLabel?: string;
  pauseLabel?: string;
  captionsHideLabel?: string;
  captionsShowLabel?: string;
  unmuteLabel?: string;
  muteLabel?: string;
  exitFullscreenLabel?: string;
  enterFullscreenLabel?: string;
  onFocus: Function;
  onBlur: Function;
};

const VideoControls = ({
  className,
  duration,
  currentTime,
  onPlayToggle = noop,
  isPlaying,
  onTimeUpdate = noop,
  captions,
  isShowingCaptions,
  onCaptionsToggle = noop,
  isMuted,
  onMuteToggle = noop,
  isFullScreen,
  onFullscreenToggle = noop,
  navAriaLabel = 'Video Controls',
  playLabel = 'Play Video',
  pauseLabel = 'Pause Video',
  captionsHideLabel = 'Hide Captions',
  captionsShowLabel = 'Show Captions',
  unmuteLabel = 'Unmute Video',
  muteLabel = 'Mute Video',
  exitFullscreenLabel = 'Exit Fullscreen Mode',
  enterFullscreenLabel = 'Enter Fullscreen Mode',
  onFocus = noop,
  onBlur = noop
}: Props) => {
  function formatTime(totalSeconds: number) {
    const totalSecondsFloat = totalSeconds;
    let minutes: string | number = Math.floor(totalSecondsFloat / 60);
    let seconds: string | number = Math.round(totalSecondsFloat - minutes * 60);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  const isFullscreenAPISupported = useMemo(() => {
    return (
      // @ts-ignore
      document.body.requestFullScreen ||
      document.body.requestFullscreen ||
      // @ts-ignore
      document.body.mozRequestFullScreen ||
      // @ts-ignore
      document.body.webkitRequestFullscreen ||
      // @ts-ignore
      document.body.webkitEnterFullScreen ||
      // @ts-ignore
      document.body.msRequestFullscreen
    );
  }, []);

  return (
    <nav
      className={classnames(styles.VideoControls, className)}
      aria-label={navAriaLabel}
      onFocus={onFocus as FocusEventHandler}
      onBlur={onBlur as FocusEventHandler}
    >
      <VideoTimeline duration={duration} currentTime={Number(currentTime)} onTimeUpdate={onTimeUpdate} />

      <div className={styles.controlsContainer}>
        <div className={styles.leftContainer}>
          <Cta
            className={styles.button}
            aria-label={isPlaying ? pauseLabel : playLabel}
            isWhite={true}
            onClick={onPlayToggle}
          >
            {isPlaying ? <PauseIcon aria-hidden /> : <PlayIcon aria-hidden />}
          </Cta>
          <Cta
            className={styles.button}
            aria-label={isMuted ? unmuteLabel : muteLabel}
            isWhite={true}
            onClick={onMuteToggle}
          >
            {isMuted ? <MutedIcon aria-hidden /> : <UnmutedIcon aria-hidden />}
          </Cta>

          <time className={styles.time}>
            {formatTime(Number(currentTime))} / {formatTime(Number(duration))}
          </time>
        </div>
        <div className={styles.rightContainer}>
          {captions && (
            <Cta
              className={styles.button}
              aria-label={isShowingCaptions ? captionsHideLabel : captionsShowLabel}
              isWhite={true}
              onClick={onCaptionsToggle}
            >
              {isShowingCaptions ? <CaptionsOnIcon aria-hidden /> : <CaptionsOffIcon aria-hidden />}
            </Cta>
          )}

          {isFullscreenAPISupported && (
            <Cta
              className={styles.button}
              aria-label={isFullScreen ? exitFullscreenLabel : enterFullscreenLabel}
              isWhite={true}
              onClick={onFullscreenToggle}
            >
              {isFullScreen ? <ExitFullscreenIcon aria-hidden /> : <EnterFullscreenIcon aria-hidden />}
            </Cta>
          )}
        </div>
      </div>
    </nav>
  );
};

export default memo(VideoControls);
