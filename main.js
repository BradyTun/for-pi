window.onload = () => {
  const starBtn = document.getElementById('click-star');
  const countdownEl = document.getElementById('countdown');
  const mainContent = document.getElementById('main-content');
  let audio;

  // Simple beep sound generator
  function playBeep() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 1200;
    gain.gain.value = 0.2;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      ctx.close();
    }, 120);
  }

  mainContent.style.display = 'none';
  countdownEl.style.display = 'none';

  starBtn.addEventListener('click', () => {
    starBtn.disabled = true;
    starBtn.classList.add('star-animate');
    setTimeout(() => {
      starBtn.style.display = 'none';
      countdownEl.style.display = 'block';
      let count = 3;
      countdownEl.textContent = count;
      playBeep();
      // Countdown
      const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
          countdownEl.textContent = count;
          playBeep();
        } else {
          clearInterval(countdownInterval);
          countdownEl.style.display = 'none';
          mainContent.style.display = 'block';
          document.body.classList.remove('not-loaded');
          document.body.classList.add('bloom');
          // Play music after countdown
          audio = new Audio('assets/music.mp3');
          audio.volume = 1;
          audio.play();
          // Fade out at the end
          audio.addEventListener('ended', () => {
            // nothing needed, song ends naturally
          });
          // Fade out 5 seconds before end
          audio.addEventListener('loadedmetadata', () => {
            const fadeStart = Math.max(audio.duration - 5, 0);
            if (fadeStart > 0) {
              setTimeout(() => {
                let fadeAudio = setInterval(() => {
                  if (audio.volume > 0.05) {
                    audio.volume -= 0.05;
                  } else {
                    audio.volume = 0;
                    audio.pause();
                    clearInterval(fadeAudio);
                  }
                }, 100);
              }, fadeStart * 1000);
            }
          });
        }
      }, 1000);
    }, 1200);
  });
};