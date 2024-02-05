import React from 'react';
import Confetti from 'react-confetti';
import { isMobile } from 'react-device-detect';

const heartBreak = [
  'Are you sure? 😢',
  'Please say yes 😭',
  'I can cook. 😋',
  `I'll buy you food. 🍔`,
  `I'll take you to the moon. 🌙`,
  `Don't be mean. 😡`,
  `I'll be sad. 😔`,
  `I'm just a baby. 👶🏽`,
  `You're breaking my heart. 💔`,
];

const App = () => {
  const [accepted, setAccepted] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const yesButtonRef = React.useRef<HTMLButtonElement>(null);
  const [noButtonPosition, setNoButtonPosition] = React.useState({
    x: 0,
    y: 0,
  });

  const [mobileButtonNoText, setMobileButtonNoText] = React.useState('No 😭');

  const noButtonRef = React.useRef<HTMLButtonElement>(null);

  const moveNoButtonToRandomPosition = () => {
    if (containerRef.current && noButtonRef.current) {
      noButtonRef.current.style.position = 'absolute';

      const containerRect = containerRef.current.getBoundingClientRect();
      const noButtonRect = noButtonRef.current.getBoundingClientRect();

      const maxX = containerRect.width - noButtonRect.width;
      // maxY can be 90vh to keep the button within the viewport
      const maxY = window.innerHeight * 0.9 - noButtonRect.height;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      setNoButtonPosition({
        x: randomX,
        y: randomY,
      });
    }
  };

  const { width, height } = containerRef.current?.getBoundingClientRect() || {
    width: 0,
    height: 0,
  };

  const handleMobileButtonNoText = () => {
    const randomIndex = Math.floor(Math.random() * heartBreak.length);
    setMobileButtonNoText(heartBreak[randomIndex]);

    // on every click, decrease the font size by 2px to make the text fit and decrease the button size
    const noButton = noButtonRef.current;
    if (noButton) {
      const fontSize = parseInt(
        window.getComputedStyle(noButton).fontSize.replace('px', ''),
        10
      );

      const padding = parseInt(
        window.getComputedStyle(noButton).padding.replace('px', ''),
        10
      );

      noButton.style.fontSize = `${fontSize - 0.75}px`;
      noButton.style.padding = `${padding - 1}px`;
    }

    // increase the font size and padding of the yes button
    const yesButton = yesButtonRef.current;
    if (yesButton) {
      const fontSize = parseInt(
        window.getComputedStyle(yesButton).fontSize.replace('px', ''),
        10
      );

      const padding = parseInt(
        window.getComputedStyle(yesButton).padding.replace('px', ''),
        10
      );

      yesButton.style.fontSize = `${fontSize + 2}px`;
      yesButton.style.padding = `${padding + 2}px`;
    }
  };

  return (
    <div ref={containerRef} className='px-8 sm:px-6 relative'>
      <h1 className='text-xl md:text-3xl text-center font-bold'>
        {!accepted
          ? 'Will you please be my valentine???? 🥺🫰🏽'
          : `Yayyyy, let's goooo, love youuu!!! 😘 👩‍❤️‍👨`}
      </h1>
      <div className='max-w-max mx-auto my-10'>
        {!accepted ? (
          <img
            src='https://media.tenor.com/2cCE8KUWjmgAAAAi/flower-pupper.gif'
            alt=''
            className='h-40 md:h-full'
          />
        ) : (
          <img
            src='https://media.tenor.com/sFStC1YwBzMAAAAi/milk-and-mocha-hug.gif'
            alt=''
            className='h-40 md:h-full'
          />
        )}
      </div>

      {!accepted ? (
        <div className='max-w-max my-14 mx-auto flex gap-5 items-center'>
          <button
            ref={yesButtonRef}
            type='button'
            onClick={() => setAccepted(true)}
            className='bg-indigo-600 text-white px-5 py-2 text-xl rounded-lg hover:bg-indigo-700'
          >
            Yes 😍
          </button>

          {!isMobile ? (
            <button
              type='button'
              ref={noButtonRef}
              onMouseEnter={moveNoButtonToRandomPosition}
              style={{
                top: `${noButtonPosition.y}px`,
                left: `${noButtonPosition.x}px`,
                transition: 'top 0.35s, left 0.35s',
              }}
              className='bg-red-500 cursor-not-allowed text-white px-4 py-2 text-lg rounded-lg hover:bg-red-700'
            >
              No 😭
            </button>
          ) : (
            <button
              ref={noButtonRef}
              type='button'
              onClick={handleMobileButtonNoText}
              className='bg-red-500 cursor-not-allowed text-white px-4 py-2 text-lg rounded-lg hover:bg-red-700'
            >
              {mobileButtonNoText}
            </button>
          )}
        </div>
      ) : null}
      {accepted ? <Confetti width={width} height={height} /> : null}
    </div>
  );
};

export default App;
