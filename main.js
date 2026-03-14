onload = () => {
    const countdownEl = document.getElementById("countdown");
    let count = 3;
    
    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        countdownEl.textContent = count;
      } else {
        clearInterval(countdownInterval);
        countdownEl.style.display = "none";
        document.body.classList.remove("not-loaded");
      }
    }, 1000);
  };