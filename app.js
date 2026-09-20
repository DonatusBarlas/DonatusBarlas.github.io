/**
 * The Great Filter - thegreatfilter.me
 * Interactive Experience Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initTimeline();
  initCalculator();
  initMobileMenu();
  initDispatchForm();
});

/* ==========================================================================
   1. Dynamic Interactive Cosmic Canvas
   ========================================================================== */
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createStars();
  });

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  const starCount = Math.min(Math.floor((width * height) / 4500), 280);
  let stars = [];

  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.z = Math.random() * 2 + 0.5; // depth layer
      this.size = (Math.random() * 1.5 + 0.5) * this.z;
      this.baseAlpha = Math.random() * 0.7 + 0.2;
      this.alpha = this.baseAlpha;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinklePhase = Math.random() * Math.PI * 2;
      // Slight cosmic tint
      const tints = ['#ffffff', '#e0e7ff', '#bae6fd', '#fbcfe8', '#c7d2fe'];
      this.color = tints[Math.floor(Math.random() * tints.length)];
    }

    update() {
      this.twinklePhase += this.twinkleSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.twinklePhase) * 0.25;

      // Parallax movement based on mouse
      const dx = (mouseX - width / 2) * 0.0003 * this.z;
      const dy = (mouseY - height / 2) * 0.0003 * this.z;
      this.x += dx;
      this.y += dy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0.1, Math.min(1, this.alpha));
      ctx.shadowBlur = this.size > 2 ? 8 : 0;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
  }

  createStars();

  function animate() {
    // Smooth lerp mouse coordinates
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    ctx.clearRect(0, 0, width, height);

    // Render faint cosmic connecting lines between close stars
    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw();

      // Check proximity with next few stars
      for (let j = i + 1; j < Math.min(i + 4, stars.length); j++) {
        const dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
        if (dist < 85) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = '#7059ff';
          ctx.globalAlpha = (1 - dist / 85) * 0.12;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. The 9 Evolutionary Steps & Interactive Filter Placement
   ========================================================================== */
const STEPS_DATA = [
  {
    id: 1,
    title: "1. Habitable Star System & Raw Chemistry",
    stage: "Cosmic",
    passed: true,
    summary: "Right stellar metallicity, stable galactic habitable zone, volatile-bearing rocky planet with water.",
    deepDetail: "Planets like Earth require stars enriched with elements heavier than hydrogen and helium. Millions of years of planetary bombardment and tidal stabilization by a large moon create an ideal cradle.",
    difficulty: "Common (~10-20% of stars)"
  },
  {
    id: 2,
    title: "2. Abiogenesis (Inert Chemistry to Life)",
    stage: "Biological",
    passed: true,
    summary: "Spontaneous emergence of self-replicating molecules (RNA/DNA) from primordial prebiotic soups or hydrothermal vents.",
    deepDetail: "Life emerged on Earth remarkably early (~3.8B years ago), suggesting it might be readily chemistry-driven, or Earth may have experienced a colossal astronomical stroke of luck.",
    difficulty: "Unknown — Possible early Great Filter candidate"
  },
  {
    id: 3,
    title: "3. Simple Microscopic Life (Prokaryotes)",
    stage: "Biological",
    passed: true,
    summary: "Single-cell organisms without a nucleus (bacteria, archaea) thriving in extreme conditions.",
    deepDetail: "Prokaryotes dominated Earth for over 1.5 billion years unchanged. They are resilient and could potentially exist on Mars, Europa, or Enceladus.",
    difficulty: "Moderate — Microbes survive in extreme planetary environments"
  },
  {
    id: 4,
    title: "4. Complex Single Cells (Eukaryotes & Endosymbiosis)",
    stage: "Biological",
    passed: true,
    summary: "The singular fusion where an archaeon engulfed a bacterium, giving birth to mitochondria and complex cell machinery.",
    deepDetail: "This event happened exactly ONCE in 4 billion years of Earth history. Every animal, plant, and fungus descends from this single freak symbiotic anomaly. Many evolutionary biologists argue this IS the Great Filter behind us.",
    difficulty: "Extremely Rare — Premier candidate for Great Filter Behind Us"
  },
  {
    id: 5,
    title: "5. Sexual Reproduction & Multicellularity",
    stage: "Biological",
    passed: true,
    summary: "Cell differentiation, collective organisms, genetic recombination driving rapid evolutionary adaptability.",
    deepDetail: "Multicellularity evolved independently over 20 separate times in Earth's history (in plants, animals, fungi, algae), suggesting that once complex cells exist, macroscopic bodies are likely.",
    difficulty: "High, but evolved multiple convergent times"
  },
  {
    id: 6,
    title: "6. Tool-Using Intelligence & Abstract Language",
    stage: "Cognitive",
    passed: true,
    summary: "High encephalization, symbolic communication, cumulative cultural transmission of knowledge.",
    deepDetail: "Billions of species have lived on Earth over 500M years, yet only one branch developed recursive symbolic language, mathematics, and technological manipulation. Intelligence is not an inevitable evolutionary attractor.",
    difficulty: "Very Low Probability — High candidate for Filter Behind Us"
  },
  {
    id: 7,
    title: "7. Technological Civilization & Planetary Dominance",
    stage: "Technological",
    passed: true,
    isCurrent: true,
    summary: "Industrial revolution, harnessing fossil & nuclear energy, global communications, space exploration. (WE ARE HERE)",
    deepDetail: "Humanity currently occupies this step. We command planetary-scale energy, have reached the Moon, and possess telescopes capable of surveying exoplanetary atmospheres.",
    difficulty: "ACHIEVED BY HUMANITY TODAY"
  },
  {
    id: 8,
    title: "8. The Existential Bottleneck (The Survival Transition)",
    stage: "Existential",
    passed: false,
    summary: "Surviving the dangerous era where technology creates existential risks before interstellar dispersal.",
    deepDetail: "Threats include synthetic super-pathogens, misaligned Artificial General Intelligence (AGI), thermonuclear exchange, ecological destabilization, or irreversible civilizational collapse. If civilizations inevitably annihilate themselves here, the Filter is AHEAD.",
    difficulty: "CRITICAL EXISTENTIAL CHOKEPOINT (FILTER AHEAD)"
  },
  {
    id: 9,
    title: "9. Interstellar Expansion & Kardashev Type II/III",
    stage: "Cosmic",
    passed: false,
    summary: "Dyson spheres, self-replicating probes (von Neumann machines), colonizing stellar systems across the galaxy.",
    deepDetail: "A civilization expanding at just 1% light speed would colonize the entire Milky Way in under 50 million years—a blink in cosmic time (13.8 billion years). Because the galaxy is not colonised, no known civilization has ever passed Step 8.",
    difficulty: "Never observed anywhere in the visible universe"
  }
];

function initTimeline() {
  const container = document.getElementById('timeline-steps-container');
  const slider = document.getElementById('filter-slider');
  const statusIndicator = document.getElementById('filter-status-indicator');
  const statusText = document.getElementById('filter-status-text');

  if (!container || !slider) return;

  function renderSteps(selectedFilterStage) {
    container.innerHTML = '';

    STEPS_DATA.forEach((step) => {
      const isFilterSpot = step.id === selectedFilterStage;
      const isBehind = step.id < selectedFilterStage;
      const isCurrentHuman = step.id === 7;

      const card = document.createElement('div');
      card.className = `step-card ${isFilterSpot ? 'filter-location active-step' : ''} ${isCurrentHuman ? 'current-step' : ''}`;
      card.setAttribute('data-id', step.id);

      let badgeHtml = '';
      if (step.id < 7) {
        badgeHtml = '<span class="step-badge badge-passed">Passed by Earth</span>';
      } else if (step.id === 7) {
        badgeHtml = '<span class="step-badge badge-current">Humanity Is Here</span>';
      } else {
        badgeHtml = '<span class="step-badge badge-future">Uncharted Future</span>';
      }

      card.innerHTML = `
        <div class="step-number">${step.id}</div>
        <div class="step-body">
          <div class="step-title-row">
            <h3 class="step-title">${step.title}</h3>
            ${badgeHtml}
          </div>
          <p class="step-desc">${step.summary}</p>
          <div class="step-detail">
            <p><strong>Deep Analysis:</strong> ${step.deepDetail}</p>
            <p style="margin-top:0.4rem; color:var(--accent-cyan); font-family:var(--font-mono); font-size:0.82rem;">Estimated Barrier: ${step.difficulty}</p>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        slider.value = step.id;
        updateFilterPlacement(step.id);
      });

      container.appendChild(card);
    });
  }

  function updateFilterPlacement(stageId) {
    stageId = parseInt(stageId, 10);
    renderSteps(stageId);

    if (stageId <= 6) {
      statusIndicator.className = 'filter-status-indicator status-behind';
      statusText.innerHTML = `🛡️ Filter is <strong>BEHIND US</strong> at Step ${stageId} — We are an astronomical miracle!`;
    } else if (stageId === 7) {
      statusIndicator.className = 'filter-status-indicator status-behind';
      statusText.innerHTML = `⚖️ Filter is <strong>ACTIVE RIGHT NOW</strong> at Step 7 — The transition century!`;
    } else {
      statusIndicator.className = 'filter-status-indicator status-ahead';
      statusText.innerHTML = `⚠️ Filter is <strong>AHEAD OF US</strong> at Step ${stageId} — Existential danger awaits!`;
    }
  }

  slider.addEventListener('input', (e) => {
    updateFilterPlacement(e.target.value);
  });

  // Initial render with Step 8 as default Great Filter (existential bottleneck)
  updateFilterPlacement(slider.value || 8);
}

/* ==========================================================================
   3. Interactive Drake Equation & Great Filter Probability Engine
   ========================================================================== */
function initCalculator() {
  const rStar = document.getElementById('calc-rstar');
  const fp = document.getElementById('calc-fp');
  const ne = document.getElementById('calc-ne');
  const fl = document.getElementById('calc-fl');
  const fi = document.getElementById('calc-fi');
  const fc = document.getElementById('calc-fc');
  const sFilter = document.getElementById('calc-sfilter');
  const lSpan = document.getElementById('calc-l');

  const outNumber = document.getElementById('calc-result-number');
  const outStatus = document.getElementById('calc-result-status');
  const outDesc = document.getElementById('calc-result-desc');

  if (!rStar || !outNumber) return;

  const presets = {
    optimist: { rStar: 10, fp: 1.0, ne: 2.0, fl: 1.0, fi: 0.5, fc: 0.2, sFilter: 0.5, lSpan: 50000 },
    pessimist: { rStar: 3, fp: 0.4, ne: 0.2, fl: 0.001, fi: 0.001, fc: 0.01, sFilter: 0.01, lSpan: 500 },
    hanson: { rStar: 7, fp: 0.8, ne: 0.5, fl: 0.1, fi: 0.05, fc: 0.05, sFilter: 0.0001, lSpan: 2000 }
  };

  function updateDisplayValues() {
    document.getElementById('val-rstar').textContent = `${parseFloat(rStar.value).toFixed(1)} / yr`;
    document.getElementById('val-fp').textContent = `${Math.round(parseFloat(fp.value) * 100)}%`;
    document.getElementById('val-ne').textContent = `${parseFloat(ne.value).toFixed(2)}`;
    document.getElementById('val-fl').textContent = `${(parseFloat(fl.value) * 100).toFixed(parseFloat(fl.value) < 0.01 ? 3 : 1)}%`;
    document.getElementById('val-fi').textContent = `${(parseFloat(fi.value) * 100).toFixed(parseFloat(fi.value) < 0.01 ? 3 : 1)}%`;
    document.getElementById('val-fc').textContent = `${(parseFloat(fc.value) * 100).toFixed(1)}%`;
    document.getElementById('val-sfilter').textContent = `${(parseFloat(sFilter.value) * 100).toFixed(parseFloat(sFilter.value) < 0.01 ? 4 : 2)}%`;
    document.getElementById('val-l').textContent = `${parseInt(lSpan.value, 10).toLocaleString()} yrs`;
  }

  function recalculate() {
    updateDisplayValues();

    const R = parseFloat(rStar.value);
    const Fp = parseFloat(fp.value);
    const Ne = parseFloat(ne.value);
    const Fl = parseFloat(fl.value);
    const Fi = parseFloat(fi.value);
    const Fc = parseFloat(fc.value);
    const S = parseFloat(sFilter.value);
    const L = parseFloat(lSpan.value);

    // Standard Drake formula modulated by Great Filter survival probability S
    const N = R * Fp * Ne * Fl * Fi * Fc * S * L;

    if (N < 0.01) {
      outNumber.textContent = "< 0.01";
    } else if (N < 10) {
      outNumber.textContent = N.toFixed(2);
    } else if (N < 1000) {
      outNumber.textContent = Math.round(N).toLocaleString();
    } else {
      outNumber.textContent = Math.round(N).toLocaleString();
    }

    if (N < 1) {
      outStatus.textContent = "COSMIC SOLITUDE (Filter Behind Us)";
      outStatus.style.color = "#34d399";
      outStatus.style.background = "rgba(16, 185, 129, 0.15)";
      outDesc.innerHTML = `Under these parameters, we are effectively <strong>alone in the Milky Way</strong>. 
      The Great Filter occurred in our evolutionary past (likely abiogenesis or complex eukaryotic development). 
      This is the most reassuring scientific outcome for humanity: our greatest hurdles are behind us, and the galaxy is an empty, open frontier.`;
    } else if (N <= 50) {
      outStatus.textContent = "SPARSE WHISPERS (Narrow Window)";
      outStatus.style.color = "#00e5ff";
      outStatus.style.background = "rgba(0, 229, 255, 0.15)";
      outDesc.innerHTML = `Civilizations are extraordinarily scarce. Interstellar distances (~thousands of light years) make direct contact nearly impossible. A significant filter exists, either in biological emergence or early civilizational survival.`;
    } else {
      outStatus.textContent = "THE PARADOX DEEPENS (Filter Ahead / Dark Forest)";
      outStatus.style.color = "#ff6b8b";
      outStatus.style.background = "rgba(255, 51, 102, 0.15)";
      outDesc.innerHTML = `Your model predicts <strong>thousands of technological civilizations</strong> should exist right now! 
      Because our telescopes see zero megastructures or radio beacons, <strong>this parameter space directly manifests the Fermi Paradox</strong>. 
      Either the Great Filter lies lethally ahead in our immediate future, or civilizations intentionally hide in silence.`;
    }
  }

  // Attach input listeners
  [rStar, fp, ne, fl, fi, fc, sFilter, lSpan].forEach(input => {
    input.addEventListener('input', () => {
      // Clear preset active styling
      document.querySelectorAll('.calc-preset-btn').forEach(b => b.classList.remove('active'));
      recalculate();
    });
  });

  // Preset button handling
  document.querySelectorAll('.calc-preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const presetKey = e.target.getAttribute('data-preset');
      const p = presets[presetKey];
      if (!p) return;

      rStar.value = p.rStar;
      fp.value = p.fp;
      ne.value = p.ne;
      fl.value = p.fl;
      fi.value = p.fi;
      fc.value = p.fc;
      sFilter.value = p.sFilter;
      lSpan.value = p.lSpan;

      document.querySelectorAll('.calc-preset-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      recalculate();
    });
  });

  // Initial calculation
  recalculate();
}

/* ==========================================================================
   4. Mobile Menu Handling
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    const isOpen = navLinks.classList.contains('mobile-open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

/* ==========================================================================
   5. Interactive Dispatch Note & Form
   ========================================================================== */
function initDispatchForm() {
  const form = document.getElementById('dispatch-form');
  const msg = document.getElementById('dispatch-msg');

  if (!form || !msg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (!input || !input.value) return;

    msg.style.display = 'block';
    msg.textContent = 'Transmission received. You are linked to The Great Filter dispatch channel.';
    input.value = '';

    setTimeout(() => {
      msg.style.display = 'none';
    }, 6000);
  });
}
