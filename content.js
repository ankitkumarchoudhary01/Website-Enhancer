// ======================
// MOTION LAYER ENGINE
// ======================



// ======================
// SCROLL PHYSICS
// ======================

let currentScroll = window.scrollY;

let targetScroll = window.scrollY;

let scrollVelocity = 0;

window.addEventListener(
  "wheel",
  (e) => {

    // Prevent default jump
    e.preventDefault();
    if (Math.abs(scrollVelocity) > 20) {

  document.body.classList.add(
    "motion-scrolling"
  );

} else {

  document.body.classList.remove(
    "motion-scrolling"
  );
}

    // Add velocity
    scrollVelocity +=
      e.deltaY * 0.8;

  },
  { passive: false }
);

// ======================
// THEME DETECTION
// ======================

let motionThemeColor =
  "255,255,255";


console.log("Motion Layer Running");

function detectThemeColor() {

  const bodyStyle =
    getComputedStyle(document.body);

  const bg =
    bodyStyle.backgroundColor;

  // Extract RGB values
  const match =
    bg.match(/\\d+/g);

  if (!match) return;

  const [r, g, b] =
    match.map(Number);

  // Bright websites
  if (
    r > 180 &&
    g > 180 &&
    b > 180
  ) {

    motionThemeColor =
      "80,80,80";
  }

  // Dark websites
  else {

    motionThemeColor =
      "255,255,255";
  }
}

detectThemeColor();

if (!window.motionLayerInitialized) {
  window.motionLayerInitialized = true;

  function initMotionLayer() {
    if (!document.body) {
      requestAnimationFrame(initMotionLayer);
      return;
    }

    // ======================
    // CREATE OVERLAY
    // ======================

    const overlay = document.createElement("div");

    overlay.id = "motion-layer-overlay";

    document.body.appendChild(overlay);

    // ======================
    // CHECK NAVIGATION STATE
    // ======================

    const fromTransition = sessionStorage.getItem("motion-transition");

    // If page came from animated navigation
    if (fromTransition === "true") {
      sessionStorage.removeItem("motion-transition");

      requestAnimationFrame(() => {
        overlay.style.opacity = "0";
      });

      setTimeout(() => {
        overlay.remove();
      }, 500);
    } else {
      // FIRST NORMAL PAGE LOAD
      overlay.remove();
    }

    // ======================
    // INTERCEPT LINKS
    // ======================

    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");

      if (!link) return;

      const href = link.href;

      // Ignore invalid links
      if (
        !href ||
        href.startsWith("javascript:") ||
        href.startsWith("#") ||
        link.target === "_blank"
      ) {
        return;
      }

      e.preventDefault();

      // Re-add overlay if removed
      if (!document.body.contains(overlay)) {
        document.body.appendChild(overlay);
      }

      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
      });

      // Save transition state
      sessionStorage.setItem("motion-transition", "true");

      // Navigate after animation
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });


    // ======================
// GLASS OVERLAY
// ======================

const glass =
  document.createElement("div");

glass.id =
  "motion-glass-overlay";

document.body.appendChild(
  glass
);

    // ======================
    // HOVER EFFECTS
    // ======================

    // ======================
    // CURSOR GLOW
    // ======================

    const cursor = document.createElement("div");

    cursor.id = "motion-cursor";

    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {
        
      previousMouseX = mouseX;
      previousMouseY = mouseY;

      mouseX = e.clientX;
      mouseY = e.clientY;

      // Calculate velocity
      const velocityX = mouseX - previousMouseX;

      const velocityY = mouseY - previousMouseY;

      mouseVelocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

      // Cursor follows mouse
      cursor.style.left = mouseX + "px";

      cursor.style.top = mouseY + "px";

      
    });

    // ======================
    // UNIVERSAL INTERACTIVE ELEMENTS
    // ======================

    function getInteractiveElements() {
      return document.querySelectorAll(`
        button,
        a,
        img,
        input,
        textarea,
        select,
        [role="button"],
        .card,
        .btn,
        .link,
        div
    `);
    }

    // ======================
    // MOTION RENDER ENGINE
    // ======================

    // Mouse position
    let mouseX = 0;
    let mouseY = 0;

    let previousMouseX = 0;
    let previousMouseY = 0;

    let mouseVelocity = 0;

    // Smooth mouse tracking
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Cursor follows mouse
      cursor.style.left = mouseX + "px";

      cursor.style.top = mouseY + "px";

      // ======================
// PARTICLE TRAILS
// ======================

// Spawn particles only
// during fast movement

if (mouseVelocity > 8) {

    const particle =
        document.createElement("div");

    particle.className =
        "motion-particle";

    particle.style.left =
        mouseX + "px";

    particle.style.top =
        mouseY + "px";

    // Dynamic particle size
    const size =
        Math.min(
            mouseVelocity * 0.4,
            18
        );

    particle.style.width =
        size + "px";

    particle.style.height =
        size + "px";

    // Random spread
    const offsetX =
        (Math.random() - 0.5) * 20;

    const offsetY =
        (Math.random() - 0.5) * 20;

    particle.style.transform =
        `
        translate(
            ${offsetX}px,
            ${offsetY}px
        )
        `;

    document.body.appendChild(
        particle
    );

    setTimeout(() => {
        particle.remove();
    }, 800);
}
    });

    let interactiveElements = getInteractiveElements();

    const elements = interactiveElements;
    const observer = new MutationObserver(() => {
      interactiveElements = getInteractiveElements();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // ======================
    // SMOOTH RENDER LOOP
    // ======================

    // ======================
    // SMOOTH MOTION ENGINE
    // ======================

    // Store animated positions
    const motionMap = new WeakMap();

    function renderMotion() {
      interactiveElements.forEach((el) => {
        // Create light layer once
        if (!el.querySelector(".motion-light")) {
          const light = document.createElement("div");

          light.className = "motion-light";

          // Ensure positioning
          const computed = getComputedStyle(el);

          if (computed.position === "static") {
            el.style.position = "relative";
          }

          el.style.overflow = "hidden";

          el.appendChild(light);
        }

        const rect = el.getBoundingClientRect();

        // Ignore tiny elements
        if (rect.width < 40 || rect.height < 20) return;

        const centerX = rect.left + rect.width / 2;

        const centerY = rect.top + rect.height / 2;

        const distanceX = mouseX - centerX;

        const distanceY = mouseY - centerY;

        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY,
        );

        // Get previous motion state
        let state = motionMap.get(el);

        if (!state) {
          state = {
            currentX: 0,
            currentY: 0,
            targetX: 0,
            targetY: 0,
            scale: 1,
          };

          motionMap.set(el, state);
        }

        // Nearby interaction
        if (distance < 150) {
          const strength = (150 - distance) / 150;

          // Velocity multiplier
          const velocityFactor = Math.min(mouseVelocity * 0.015, 2);

          // Dynamic movement
          state.targetX = distanceX * 0.05 * strength * velocityFactor;

          state.targetY = distanceY * 0.05 * strength * velocityFactor;

          // Dynamic scale
          state.scale = 1 + strength * 0.03 * velocityFactor;
          // ======================
          // DYNAMIC LIGHT POSITION
          // ======================

          const light = el.querySelector(".motion-light");

          if (light) {
            const localX = mouseX - rect.left;

            const localY = mouseY - rect.top;

            light.style.background = `
    radial-gradient(
      circle at ${localX}px ${localY}px,
      rgba(255,255,255,0.22),
      transparent 70%
    )
    `;

            light.style.opacity = strength * 1.2;
          }
        } else {
            const light =
  el.querySelector(".motion-light");

if (light) {
  light.style.opacity = "0";
}
          state.targetX = 0;
          state.targetY = 0;
          state.scale = 1;
        }

        // ======================
        // LERP SMOOTHING
        // ======================

        state.currentX += (state.targetX - state.currentX) * 0.08;

        state.currentY += (state.targetY - state.currentY) * 0.08;

        // Apply transform
        el.style.transform = `
      translate3d(
        ${state.currentX}px,
        ${state.currentY}px,
        0
      )
      scale(${state.scale})
      `;
      });

      // ======================
// SMOOTH SCROLL PHYSICS
// ======================

// Apply velocity
targetScroll += scrollVelocity;

// Friction
scrollVelocity *= 0.85;

// LERP smoothing
currentScroll +=
  (targetScroll - currentScroll)
  * 0.08;

// Prevent negative scroll
if (currentScroll < 0) {
  currentScroll = 0;
}

// Clamp max scroll
const maxScroll =
  document.body.scrollHeight -
  window.innerHeight;

if (currentScroll > maxScroll) {
  currentScroll = maxScroll;
}

// Apply scroll
window.scrollTo(
  0,
  currentScroll
);

      requestAnimationFrame(renderMotion);
    }

    // Start animation engine
    renderMotion();

    /*
// ======================
// UNIVERSAL MOTION ENGINE
// ======================
let interactiveElements =
    getInteractiveElements();
document.addEventListener("mousemove", (e) => {

    const elements =
    interactiveElements;
    const observer =
    new MutationObserver(() => {

        interactiveElements =
            getInteractiveElements();
    });

observer.observe(document.body, {
    childList: true,
    subtree: true
});

    elements.forEach((el) => {

        const rect =
            el.getBoundingClientRect();

        // Ignore tiny elements
        if (
            rect.width < 40 ||
            rect.height < 20
        ) return;

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;

        const distanceX =
            e.clientX - centerX;

        const distanceY =
            e.clientY - centerY;

        const distance =
            Math.sqrt(
                distanceX * distanceX +
                distanceY * distanceY
            );

        // Only nearby elements react
        if (distance < 150) {

            const strength =
                (150 - distance) / 150;

            const moveX =
                distanceX * 0.05 * strength;

            const moveY =
                distanceY * 0.05 * strength;

            el.style.transition =
                "transform 0.15s ease";

            el.style.transform =
                `
                translate(${moveX}px, ${moveY}px)
                scale(${1 + strength * 0.03})
                `;
        }

        else {

            el.style.transform =
                "translate(0px, 0px) scale(1)";
        }
    });
});
*/
    // ======================
    // RIPPLE EFFECT
    // ======================

    document.addEventListener("click", (e) => {
      const ripple = document.createElement("div");

      ripple.className = "motion-ripple";

      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";

      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  initMotionLayer();
}


document.documentElement.style.setProperty(
  "--motion-rgb",
  motionThemeColor
);

detectThemeColor();

