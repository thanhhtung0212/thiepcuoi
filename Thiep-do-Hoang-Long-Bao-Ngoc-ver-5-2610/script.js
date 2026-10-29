const CONFIG = {
  photos: Array.from({ length: 7 }, (_, index) => `assets/theme/gallery-${index + 1}.webp`)
};

function launchEnvelopeHearts() {
  const burst = document.querySelector(".heart-burst");
  const offsets = [[-78,-95],[58,-155],[-10,-220]];
  burst.replaceChildren(...offsets.map(([x, y], i) => {
    const heart = document.createElement("span");
    heart.textContent = "\u2665";
    heart.style.setProperty("--heart-x", `${x}px`);
    heart.style.setProperty("--heart-y", `${y}px`);
    heart.style.setProperty("--heart-delay", `${i * 240}ms`);
    return heart;
  }));
  burst.classList.remove("play");
  void burst.offsetWidth;
  burst.classList.add("play");
  window.setTimeout(() => burst.classList.remove("play"), 3200);
}

function startHeartRain() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rain = document.querySelector(".heart-rain");
  if (!rain || rain.classList.contains("is-active")) return;

  const count = window.matchMedia("(max-width: 650px)").matches ? 24 : 40;
  const hearts = Array.from({ length: count }, () => {
    const heart = document.createElement("span");
    const duration = 9 + Math.random() * 5;
    heart.className = "heart-rain__heart";
    const glyph = document.createElement("span");
    glyph.className = "heart-rain__pulse";
    glyph.textContent = "\u2665";
    heart.appendChild(glyph);
    heart.style.setProperty("--heart-left", `${Math.random() * 100}%`);
    heart.style.setProperty("--heart-size", `${18 + Math.random() * 14}px`);
    heart.style.setProperty("--heart-duration", `${duration}s`);
    heart.style.setProperty("--heart-delay", `${-Math.random() * duration}s`);
    heart.style.setProperty("--heart-drift", `${Math.round(Math.random() * 100 - 50)}px`);
    heart.style.setProperty("--heart-opacity", `${0.24 + Math.random() * 0.26}`);
    const pulseDuration = 1.3 + Math.random() * 0.9;
    heart.style.setProperty("--pulse-duration", `${pulseDuration}s`);
    heart.style.setProperty("--pulse-delay", `${-Math.random() * pulseDuration}s`);
    return heart;
  });
  rain.replaceChildren(...hearts);
  rain.classList.add("is-active");
}

document.addEventListener("DOMContentLoaded", () => {
  const weddingMusic = document.getElementById("weddingMusic");
  const musicToggle = document.getElementById("musicToggle");
  const syncMusicToggle = () => {
    const isPlaying = !weddingMusic.paused && !weddingMusic.ended;
    musicToggle.classList.toggle("is-playing", isPlaying);
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
    musicToggle.setAttribute("aria-label", isPlaying ? "Tắt nhạc" : "Bật nhạc");
    musicToggle.title = isPlaying ? "Tắt nhạc" : "Bật nhạc";
  };
  musicToggle.addEventListener("click", () => {
    if (weddingMusic.paused) {
      weddingMusic.play().catch((error) => console.warn("Không thể phát nhạc cưới:", error));
    } else {
      weddingMusic.pause();
    }
  });
  weddingMusic.addEventListener("play", syncMusicToggle);
  weddingMusic.addEventListener("pause", syncMusicToggle);
  weddingMusic.addEventListener("ended", syncMusicToggle);
  const stopWeddingMusic = () => {
    weddingMusic.pause();
    weddingMusic.currentTime = 0;
    syncMusicToggle();
  };
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") stopWeddingMusic();
  });
  window.addEventListener("pagehide", stopWeddingMusic);

  const site = document.getElementById("site");
  const cover = document.getElementById("top");
  const countdown = document.getElementById("weddingCountdown");
  if (countdown) {
    const deadline = Date.parse(countdown.dataset.deadline);
    const units = {
      days: countdown.querySelector("[data-countdown-days]"),
      hours: countdown.querySelector("[data-countdown-hours]"),
      minutes: countdown.querySelector("[data-countdown-minutes]"),
      seconds: countdown.querySelector("[data-countdown-seconds]")
    };
    const status = document.getElementById("countdownStatus");
    let countdownTimer = 0;
    const updateCountdown = () => {
      const remaining = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      units.days.textContent = String(Math.floor(remaining / 86400));
      units.hours.textContent = String(Math.floor((remaining % 86400) / 3600)).padStart(2, "0");
      units.minutes.textContent = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
      units.seconds.textContent = String(remaining % 60).padStart(2, "0");
      if (remaining === 0) {
        status.hidden = false;
        window.clearInterval(countdownTimer);
      }
    };
    updateCountdown();
    countdownTimer = window.setInterval(updateCountdown, 1000);
  }
  const revealSiteSections = () => {
    const sections = [...site.querySelectorAll(":scope > section")];
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    sections.forEach((section) => observer.observe(section));
  };
  if (new URLSearchParams(window.location.search).get("open") === "1") {
    site.hidden = false;
    cover.classList.add("is-open");
    revealSiteSections();
    startHeartRain();
  }
  const envelopeButton = document.getElementById("openEnvelope");
  envelopeButton.addEventListener("click", () => {
    const cover = document.getElementById("top");
    if (!site.hidden || cover.classList.contains("is-opening") || envelopeButton.classList.contains("is-tapped")) return;
    weddingMusic.play().catch((error) => console.warn("Không thể phát nhạc cưới:", error));
    envelopeButton.classList.add("is-tapped");
    window.setTimeout(() => {
      envelopeButton.classList.remove("is-tapped");
      cover.classList.add("is-opening");
      window.setTimeout(() => cover.classList.add("is-photo-revealing"), 350);
      window.setTimeout(() => {
        cover.classList.add("is-decoration-revealing");
        launchEnvelopeHearts();
      }, 350);
      window.setTimeout(() => {
        cover.classList.add("is-open");
        cover.classList.remove("is-opening", "is-photo-revealing", "is-decoration-revealing");
        site.hidden = false;
        const invitationUrl = new URL(window.location.href);
        invitationUrl.searchParams.set("open", "1");
        window.history.replaceState(null, "", invitationUrl);
        revealSiteSections();
        startHeartRain();
      }, 2200);
    }, 480);
  });

  const albumStack = document.getElementById("albumStack");
  const albumThumbs = document.getElementById("albumThumbs");
  const albumViewer = document.querySelector(".album-viewer");
  const albumCount = document.getElementById("albumCount");
  const albumDialog = document.getElementById("albumDialog");
  const albumDialogImage = document.getElementById("albumDialogImage");
  const albumDialogThumbs = document.getElementById("albumDialogThumbs");
  let photoIndex = 0;
  let albumIsVisible = false;
  let albumIsHovered = false;
  let albumAutoPaused = false;
  let albumAutoTimer = 0;
  let albumPauseTimer = 0;
  let touchStart = null;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function updateAlbumAutoplay() {
    window.clearInterval(albumAutoTimer);
    albumAutoTimer = 0;
    if (CONFIG.photos.length < 2 || !albumIsVisible || albumIsHovered || albumDialog.open || albumAutoPaused || reducedMotion.matches) return;
    albumAutoTimer = window.setInterval(() => showPhoto(photoIndex + 1), 2800);
  }

  function pauseAlbumAutoplay() {
    albumAutoPaused = true;
    updateAlbumAutoplay();
    window.clearTimeout(albumPauseTimer);
    albumPauseTimer = window.setTimeout(() => {
      albumAutoPaused = false;
      updateAlbumAutoplay();
    }, 6000);
  }

  function showPhoto(index) {
    photoIndex = (index + CONFIG.photos.length) % CONFIG.photos.length;
    albumCount.textContent = `${photoIndex + 1} / ${CONFIG.photos.length}`;
    albumThumbs.querySelectorAll("button").forEach((button, i) => {
      button.classList.toggle("active", i === photoIndex);
      button.setAttribute("aria-pressed", i === photoIndex ? "true" : "false");
    });
    albumDialogThumbs.querySelectorAll("button").forEach((button, i) => {
      button.classList.toggle("active", i === photoIndex);
      button.setAttribute("aria-pressed", i === photoIndex ? "true" : "false");
    });
    albumStack.querySelectorAll(".album-card").forEach((card, i) => {
      let offset = i - photoIndex;
      if (offset > CONFIG.photos.length / 2) offset -= CONFIG.photos.length;
      if (offset < -CONFIG.photos.length / 2) offset += CONFIG.photos.length;
      const distance = Math.abs(offset);
      const scale = offset === 0 ? 1.06 : Math.max(.7, 1 - distance * .15);
      card.style.transform = `translateX(calc(-50% + ${offset * 64}%)) translateZ(${-distance * 125}px) rotateY(${offset * 38}deg) scale(${scale})`;
      card.style.opacity = String(Math.max(.2, 1 - distance * .28));
      card.style.zIndex = String(100 - distance);
      card.classList.toggle("is-active", offset === 0);
      card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
    });
    if (albumDialog.open) {
      albumDialogImage.src = CONFIG.photos[photoIndex];
      albumDialogImage.alt = `Ảnh cưới Hoàng Long và Bảo Ngọc ${photoIndex + 1}`;
    }
  }

  function openAlbumPhoto(index) {
    showPhoto(index);
    albumDialogImage.src = CONFIG.photos[photoIndex];
    albumDialogImage.alt = `Ảnh cưới Hoàng Long và Bảo Ngọc ${photoIndex + 1}`;
    albumDialog.showModal();
    pauseAlbumAutoplay();
  }
  CONFIG.photos.forEach((src, index) => {
    const card = document.createElement("div");
    card.className = "album-card";
    card.style.aspectRatio = "2 / 3";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Xem ảnh cưới ${index + 1}`);
    const photo = document.createElement("img");
    photo.src = src;
    photo.alt = `Ảnh cưới Hoàng Long và Bảo Ngọc ${index + 1}`;
    photo.loading = "lazy";
    photo.addEventListener("load", () => {
      const ratio = photo.naturalWidth / photo.naturalHeight;
      if (ratio > 0) card.style.aspectRatio = String(Math.min(1.2, Math.max(.5, ratio)));
    });
    card.appendChild(photo);
    card.addEventListener("click", () => openAlbumPhoto(index));
    card.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openAlbumPhoto(index);
    });
    albumStack.appendChild(card);
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.setAttribute("aria-label", `Chọn ảnh ${index + 1}`);
    thumb.setAttribute("aria-pressed", "false");
    thumb.addEventListener("click", () => { showPhoto(index); pauseAlbumAutoplay(); });
    albumThumbs.appendChild(thumb);

    const dialogThumb = document.createElement("button");
    dialogThumb.type = "button";
    dialogThumb.className = "album-dialog-thumb";
    dialogThumb.setAttribute("aria-label", `Xem ảnh ${index + 1}`);
    dialogThumb.setAttribute("aria-pressed", "false");
    const dialogThumbImage = document.createElement("img");
    dialogThumbImage.src = src;
    dialogThumbImage.alt = "";
    dialogThumbImage.loading = "lazy";
    dialogThumb.appendChild(dialogThumbImage);
    dialogThumb.addEventListener("click", () => { showPhoto(index); pauseAlbumAutoplay(); });
    albumDialogThumbs.appendChild(dialogThumb);
  });
  showPhoto(0);
  document.getElementById("albumPrev").addEventListener("click", () => { showPhoto(photoIndex - 1); pauseAlbumAutoplay(); });
  document.getElementById("albumNext").addEventListener("click", () => { showPhoto(photoIndex + 1); pauseAlbumAutoplay(); });
  albumViewer.addEventListener("touchstart", event => {
    const touch = event.touches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  albumViewer.addEventListener("touchend", event => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = Math.abs(touch.clientY - touchStart.y);
    touchStart = null;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
      showPhoto(photoIndex + (deltaX < 0 ? 1 : -1));
      pauseAlbumAutoplay();
    }
  });
  albumViewer.addEventListener("mouseenter", () => { albumIsHovered = true; updateAlbumAutoplay(); });
  albumViewer.addEventListener("mouseleave", () => { albumIsHovered = false; updateAlbumAutoplay(); });
  reducedMotion.addEventListener("change", updateAlbumAutoplay);
  if ("IntersectionObserver" in window) {
    const albumObserver = new IntersectionObserver(entries => {
      albumIsVisible = entries.some(entry => entry.isIntersecting);
      updateAlbumAutoplay();
    }, { threshold: 0, rootMargin: "300px 0px" });
    albumObserver.observe(albumViewer);
  } else {
    albumIsVisible = true;
    updateAlbumAutoplay();
  }

  document.getElementById("albumDialogClose").addEventListener("click", () => albumDialog.close());
  document.getElementById("albumDialogPrev").addEventListener("click", () => showPhoto(photoIndex - 1));
  document.getElementById("albumDialogNext").addEventListener("click", () => showPhoto(photoIndex + 1));
  albumDialog.addEventListener("click", event => { if (event.target === albumDialog) albumDialog.close(); });
  albumDialog.addEventListener("close", updateAlbumAutoplay);
  albumDialog.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") showPhoto(photoIndex - 1);
    if (event.key === "ArrowRight") showPhoto(photoIndex + 1);
  });

  const rsvpDialog = document.getElementById("rsvpDialog");
  const rsvpForm = document.getElementById("rsvpForm");
  const rsvpStatus = document.getElementById("rsvpStatus");
  const rsvpSubmitButton = rsvpForm.querySelector('button[type="submit"]');
  document.getElementById("openRsvp").addEventListener("click", () => rsvpDialog.showModal());
  document.getElementById("closeRsvp").addEventListener("click", () => rsvpDialog.close());
  rsvpDialog.addEventListener("click", event => { if (event.target === rsvpDialog) rsvpDialog.close(); });
  rsvpForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    const attendance = data.attendance.startsWith("Có")
      ? "Có, tôi sẽ tới đó"
      : "Rất tiếc, tôi không thể tham dự";
    const responseFrame = document.createElement("iframe");
    responseFrame.name = `rsvp-response-${Date.now()}`;
    responseFrame.title = "Gửi xác nhận tham dự";
    responseFrame.hidden = true;
    responseFrame.setAttribute("aria-hidden", "true");

    const submissionForm = document.createElement("form");
    submissionForm.method = "POST";
    submissionForm.action = "https://docs.google.com/forms/d/e/1FAIpQLSeLOwl5-elRvvJNoZNJfN0lYnCpibcLrBGTS0AV_LBpoD0gZQ/formResponse";
    submissionForm.target = responseFrame.name;
    submissionForm.hidden = true;
    [
      ["fvv", "1"],
      ["pageHistory", "0"],
      ["entry.559352220", data.name.trim()],
      ["entry.877086558", attendance],
      ["entry.877086558_sentinel", ""],
      ["entry.924523986", data.guests.replace(/\D/g, "")],
      ["entry.1647591272", data.guestSide]
    ].forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      submissionForm.appendChild(input);
    });

    rsvpStatus.textContent = "Đang gửi xác nhận...";
    rsvpSubmitButton.disabled = true;
    let hasSubmitted = false;
    let isComplete = false;
    const timeout = window.setTimeout(() => {
      if (isComplete) return;
      isComplete = true;
      rsvpStatus.textContent = "Chưa nhận được phản hồi từ Google Forms. Vui lòng kiểm tra kết nối và thử lại.";
      rsvpSubmitButton.disabled = false;
      submissionForm.remove();
      responseFrame.remove();
    }, 20000);

    responseFrame.addEventListener("load", () => {
      if (!hasSubmitted) {
        hasSubmitted = true;
        try {
          submissionForm.submit();
        } catch (error) {
          window.clearTimeout(timeout);
          isComplete = true;
          rsvpStatus.textContent = `Không thể gửi xác nhận: ${error.message}`;
          rsvpSubmitButton.disabled = false;
          submissionForm.remove();
          responseFrame.remove();
        }
        return;
      }
      if (isComplete) return;
      isComplete = true;
      window.clearTimeout(timeout);
      rsvpStatus.textContent = "Cám ơn bạn đã là 1 phần quan trọng trong ngày vui trọng đại này ♥";
      rsvpSubmitButton.disabled = false;
      submissionForm.remove();
      responseFrame.remove();
    });
    document.body.append(responseFrame, submissionForm);
  });
  const wishForm = document.getElementById("wishForm");
  const wishList = document.getElementById("wishList");
  const wishStatus = document.getElementById("wishStatus");
  const wishSubmitButton = wishForm.querySelector(".wish-submit");
  const wishField = wishForm.elements.namedItem("wish");
  const wishSuggestionButton = wishForm.querySelector(".magic-button");
  const wishSuggestionList = document.getElementById("wishSuggestions");
  const wishSuggestions = [
    "Chúc Thanh Tùng và Minh Ngọc trăm năm hạnh phúc, luôn yêu thương và đồng hành bên nhau!",
    "Mừng ngày vui của hai bạn! Chúc cuộc sống chung luôn ngập tràn tiếng cười và niềm vui.",
    "Chúc gia đình nhỏ của hai bạn luôn bình an, ấm áp và đầy ắp yêu thương.",
    "Chúc cô dâu chú rể mãi giữ nụ cười rạng rỡ và sự dịu dàng dành cho nhau như hôm nay.",
    "Chúc hai bạn xây dựng tổ ấm viên mãn, cùng nhau đi qua thật nhiều chặng đường đẹp.",
    "Chúc ngày trọng đại thật trọn vẹn và những tháng năm sau này luôn ngọt ngào, hạnh phúc.",
    "Mong hai bạn luôn thấu hiểu, sẻ chia và nắm tay nhau bền lâu qua mọi mùa trong cuộc sống.",
    "Chúc tình yêu của Thanh Tùng và Minh Ngọc ngày càng đong đầy, tổ ấm luôn rộn tiếng cười.",
    "Chúc hai bạn có một khởi đầu thật đẹp và một hành trình hôn nhân bình yên, hạnh phúc.",
    "Chúc mừng Thanh Tùng và Minh Ngọc! Mong mỗi ngày bên nhau đều là một ngày đáng nhớ."
  ];
  wishSuggestions.forEach(suggestion => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wish-suggestion";
    button.textContent = suggestion;
    button.addEventListener("click", () => {
      wishField.value = suggestion;
      wishSuggestionList.hidden = true;
      wishSuggestionButton.setAttribute("aria-expanded", "false");
      wishField.focus();
    });
    wishSuggestionList.appendChild(button);
  });
  wishSuggestionButton.addEventListener("click", () => {
    const isOpening = wishSuggestionList.hidden;
    wishSuggestionList.hidden = !isOpening;
    wishSuggestionButton.setAttribute("aria-expanded", String(isOpening));
  });
  wishSuggestionButton.addEventListener("keydown", event => {
    if (event.key === "Escape" && !wishSuggestionList.hidden) {
      wishSuggestionList.hidden = true;
      wishSuggestionButton.setAttribute("aria-expanded", "false");
    }
  });
  const wishStorageKey = "wedding-wishes-v1";
  const renderWish = data => {
    const card = document.createElement("article"); card.className = "wish-item";
    const name = document.createElement("strong"); name.textContent = data.name;
    const message = document.createElement("p"); message.textContent = data.wish;
    card.append(name, message); wishList.prepend(card);
  };
  const readLocalWishes = () => {
    try { return JSON.parse(localStorage.getItem(wishStorageKey) || "[]"); }
    catch { return []; }
  };
  const saveLocalWish = data => {
    const messages = readLocalWishes();
    messages.unshift(data);
    localStorage.setItem(wishStorageKey, JSON.stringify(messages.slice(0, 500)));
  };
  const wishesApiAvailable = ["http:", "https:"].includes(window.location.protocol);
  (async () => {
    if (wishesApiAvailable) {
      try {
        const response = await fetch("wishes/api.php", { headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error("Wishes API unavailable");
        const result = await response.json();
        (result.messages || []).slice().reverse().forEach(renderWish);
        return;
      } catch { /* Use this browser's saved entries if PHP is unavailable. */ }
    }
    readLocalWishes().slice().reverse().forEach(renderWish);
  })();
  let isSubmittingWish = false;
  const sendWish = async event => {
    event.preventDefault();
    if (isSubmittingWish || !wishForm.reportValidity()) return;
    isSubmittingWish = true;
    wishSubmitButton.disabled = true;
    const data = Object.fromEntries(new FormData(wishForm).entries());
    const messageData = { name: data.name.trim(), wish: data.wish.trim() };
    wishStatus.textContent = "Đang gửi lời chúc…";
    let saved = false;
    try {
      if (!wishesApiAvailable) throw new Error("PHP server is not running");
      const response = await fetch("wishes/api.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(messageData)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Không thể lưu lời chúc.");
      renderWish(result.message);
      wishStatus.textContent = "Cám ơn bạn đã gửi những lời yêu thương cho chúng mình ♥";
      saved = true;
    } catch (error) {
      try {
        saveLocalWish(messageData);
        renderWish(messageData);
        wishStatus.textContent = "Lời chúc đã lưu trên thiết bị này. Để mọi khách cùng xem, cần chạy website trên hosting hỗ trợ PHP.";
        saved = true;
      } catch {
        wishStatus.textContent = error.message || "Không thể lưu lời chúc.";
      }
    }
    if (saved) wishForm.reset();
    isSubmittingWish = false;
    wishSubmitButton.disabled = false;
  };
  wishSubmitButton.addEventListener("click", event => { void sendWish(event); });
  wishForm.addEventListener("submit", event => { void sendWish(event); });
  const giftDialog = document.getElementById("giftDialog");
  const giftTeaser = document.querySelector(".gift-teaser");
  document.getElementById("openGift").addEventListener("click", () => { giftTeaser.classList.add("is-opening"); window.setTimeout(() => { if (!giftDialog.open) giftDialog.showModal(); }, 420); });
  document.getElementById("closeGift").addEventListener("click", () => giftDialog.close());
  giftDialog.addEventListener("close", () => giftTeaser.classList.remove("is-opening"));
  giftDialog.addEventListener("click", event => { if (event.target === giftDialog) giftDialog.close(); });
});
