import { useRef, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import { getMutePreference, saveMutePreference } from '../services/localStorage';

export function useSound() {
  const sounds = useRef({});
  const muted = useRef(getMutePreference());

  useEffect(() => {
    sounds.current = {
      correct: new Howl({ src: ['/sounds/correct.wav'], volume: 0.8 }),
      wrong:   new Howl({ src: ['/sounds/wrong.wav'],   volume: 0.8 }),
      levelup: new Howl({ src: ['/sounds/levelup.wav'], volume: 1.0 }),
      gameover:new Howl({ src: ['/sounds/gameover.wav'],volume: 1.0 }),
      bg:      new Howl({ src: ['/sounds/background.wav'], volume: 0.25, loop: true }),
    };

    Howler.mute(muted.current);

    return () => {
      Object.values(sounds.current).forEach(s => s.unload());
    };
  }, []);

  const play = (key) => {
    sounds.current[key]?.play();
  };

  const toggleMute = () => {
    muted.current = !muted.current;
    Howler.mute(muted.current);
    saveMutePreference(muted.current);
    return muted.current;
  };

  const startBg = () => {
    const bg = sounds.current.bg;
    if (bg && !bg.playing()) bg.play();
  };

  const stopBg = () => sounds.current.bg?.stop();

  return {
    playCorrect: () => play('correct'),
    playWrong:   () => play('wrong'),
    playLevelUp: () => play('levelup'),
    playGameOver:() => play('gameover'),
    startBg,
    stopBg,
    toggleMute,
    isMuted: () => muted.current,
  };
}
