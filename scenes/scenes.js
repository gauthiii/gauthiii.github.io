/* Shared scene builders — used by the live site (timeline scrubbed by scroll) and by the
   HyperFrames films (same timeline seeked frame by frame). Each builder fills `root` with
   its DOM and adds tweens to `tl` between 0 and Scenes.DURATION seconds.
   Deterministic only: no Math.random, no Date.now. Classic script → window.Scenes. */
(function () {
  "use strict";

  var D = 9.5;

  function el(tag, cls, parent, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    if (parent) parent.appendChild(n);
    return n;
  }

  function img(parent, src, cls, alt) {
    var i = el("img", "sc-img" + (cls ? " " + cls : ""), parent);
    // site only: every chapter sits on one stage, so the page sets src when a chapter is near;
    // films keep eager loading for frame capture
    if (S.lazy) i.dataset.src = src; else i.src = src;
    i.alt = alt || "";
    i.decoding = "async";
    i.draggable = false;
    return i;
  }

  // A neutral device frame: hairline border, rounded, no fake browser text.
  function device(root, ratio) {
    var d = el("div", "sc-device", root);
    d.style.aspectRatio = ratio || "16 / 10";
    var view = el("div", "sc-view", d);
    return { frame: d, view: view };
  }

  // Step through captured frames: each frame cross-fades in at its time.
  // exclusive: hide the previous frame once the next is in (needed for transparent frames).
  function sequence(tl, view, base, frames, fade, exclusive) {
    var nodes = frames.map(function (f, i) {
      var n = img(view, base + f.src, f.cls, f.alt);
      n.style.zIndex = i + 1;
      if (i > 0) n.style.opacity = 0;
      return n;
    });
    frames.forEach(function (f, i) {
      if (i === 0) return;
      var d = f.fade != null ? f.fade : fade;
      tl.to(nodes[i], { opacity: 1, duration: d, ease: "power1.inOut" }, f.t);
      if (exclusive) tl.set(nodes[i - 1], { opacity: 0 }, f.t + d);
    });
    return nodes;
  }

  // Small annotation chip pinned to the stage (labels what the footage shows).
  function note(tl, root, text, at, pos) {
    var n = el("div", "sc-note", root, text);
    n.style.cssText += pos || "right:4%;top:6%;";
    tl.from(n, { autoAlpha: 0, y: 12, filter: "blur(6px)", duration: 0.45, ease: "expo.out" }, at);
    return n;
  }

  var S = { DURATION: D, lazy: false };

  /* 01 · ForgeUI — ⌘K palette, then one dashboard re-styled with diagonal wipes, then the 16-style wall. */
  S.forgeui = function (root, tl, o) {
    var b = o.base + "forgeui/";
    var dv = device(root, "16 / 9");
    var pal = ["pal-00", "pal-02", "pal-04", "pal-07"].map(function (n, i) {
      var p = img(dv.view, b + n + ".webp", "", i ? "" : "ForgeUI command palette searching industries");
      p.style.zIndex = i + 1;
      if (i) p.style.opacity = 0;
      return p;
    });
    pal.forEach(function (p, i) { if (i) tl.set(p, { opacity: 1 }, 0.45 * i); });

    var styles = [["modern", "Modern"], ["glass", "Glassmorphism"], ["brutalism", "Neo-Brutalism"], ["cyber", "Cyber / Terminal"], ["aurora", "Aurora"], ["liquid-glass", "Liquid Glass"]];
    var label = el("div", "sc-label", dv.frame);
    var edge = el("div", "sc-wipe-edge", dv.view);
    styles.forEach(function (s, i) {
      var layer = img(dv.view, b + "morph-" + s[0] + ".webp", "", "FinFlow dashboard in the " + s[1] + " style");
      layer.style.zIndex = 10 + i;
      var name = el("span", "sc-label-item", label, s[1]);
      var at = 1.9 + i * 1.05;
      if (i === 0) {
        tl.fromTo(layer, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, at);
      } else {
        tl.fromTo(layer, { clipPath: "polygon(0% 0%, 0% 0%, -18% 100%, -18% 100%)" },
          { clipPath: "polygon(0% 0%, 118% 0%, 100% 100%, -18% 100%)", duration: 0.42, ease: "power2.inOut" }, at);
        tl.fromTo(edge, { xPercent: -30, opacity: 1 }, { xPercent: 1180, duration: 0.42, ease: "power2.inOut" }, at);
        tl.set(edge, { opacity: 0 }, at + 0.42);
      }
      tl.fromTo(name, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "expo.out" }, at + 0.1);
      if (i < styles.length - 1) tl.to(name, { autoAlpha: 0, y: -8, duration: 0.2, ease: "power2.in" }, at + 0.95);
    });

    var wall = el("div", "sc-wall", root);
    ["minimal", "modern", "glass", "neumorphism", "liquid-glass", "aurora", "colorful", "clay", "brutalism", "bento", "retro", "cyber", "enterprise", "clinical", "editorial", "pro-dark"].forEach(function (n) {
      img(el("div", "sc-wall-tile", wall), b + "wall/" + n + ".webp", "", "");
    });
    tl.to(dv.frame, { scale: 0.86, autoAlpha: 0, duration: 0.5, ease: "power2.inOut" }, 7.75);
    tl.to(label, { autoAlpha: 0, duration: 0.3 }, 7.75);
    tl.from(wall.children, { autoAlpha: 0, scale: 0.9, duration: 0.5, ease: "expo.out", stagger: { each: 0.03, grid: [4, 4], from: "center" } }, 7.9);
    note(tl, root, "16 styles · one screen", 8.1, "left:50%;bottom:3%;transform:translateX(-50%);");
  };

  /* 02 · Mathra — question typed, MCP chapter tool called, KaTeX answer streams in. */
  S.mathra = function (root, tl, o) {
    var b = o.base + "mathra/";
    var dv = device(root, "16 / 10");
    var cam = el("div", "sc-cam", dv.view);
    sequence(tl, cam, b, [
      { src: "01-empty.webp", t: 0, alt: "Mathra chat, empty state with starter questions" },
      { src: "02-typing-1.webp", t: 0.7 }, { src: "02-typing-2.webp", t: 1.2 }, { src: "02-typing-3.webp", t: 1.7 },
      { src: "03-thinking.webp", t: 2.4 }, { src: "04-tool.webp", t: 3.1 },
      { src: "05-stream-1.webp", t: 4.0 }, { src: "05-stream-2.webp", t: 4.8 }, { src: "05-stream-3.webp", t: 5.6 },
      { src: "05-stream-4.webp", t: 6.4 }, { src: "05-stream-5.webp", t: 7.2 },
      { src: "05-stream-6.webp", t: 8.0, alt: "Worked answer with matrices rendered in KaTeX" },
    ], 0.12);
    tl.fromTo(cam, { scale: 1, transformOrigin: "50% 30%" }, { scale: 1.16, duration: 4.5, ease: "power2.inOut" }, 2.6);
    tl.to(cam, { y: "-14%", duration: 3.2, ease: "power1.inOut" }, 5.2);
    note(tl, dv.frame, "MCP tool call → matrices", 3.15);
  };

  /* 03 · InboxPulse — sync, nine categories, then a flagged phishing mail with its AI summary. */
  S.inboxpulse = function (root, tl, o) {
    var b = o.base + "inboxpulse/";
    var dv = device(root, "16 / 10");
    sequence(tl, dv.view, b, [
      { src: "01-syncing.webp", t: 0, alt: "InboxPulse syncing two inboxes" },
      { src: "02-dashboard.webp", t: 1.1, alt: "AI summary and nine category cards" },
      { src: "03-categories.webp", t: 3.4 },
      { src: "04-dangerous.webp", t: 5.2 },
      { src: "05-drawer.webp", t: 6.9, alt: "Phishing email flagged with a one-line AI summary" },
    ], 0.45);
    var rules = note(tl, dv.frame, "rules first, then the LLM", 1.6);
    tl.to(rules, { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 6.7);
    note(tl, dv.frame, "phishing caught", 7.2, "left:4%;bottom:6%;");
  };

  /* 04 · Prixie — the real overlay: passive coaching streams in, then "Prixie, …" flips to direct advice. */
  S.prixie = function (root, tl, o) {
    var b = o.base + "prixie/";
    var stage = el("div", "sc-prixie", root);
    var wave = el("div", "sc-wave", stage);
    for (var i = 0; i < 48; i++) {
      var bar = el("span", "", wave);
      bar.style.setProperty("--h", (18 + Math.abs(Math.sin(i * 0.7) * 62 + Math.sin(i * 1.9) * 18)).toFixed(1) + "%");
    }
    var ov = el("div", "sc-overlay", stage);
    sequence(tl, ov, b, [
      { src: "01-ready.webp", t: 0, alt: "Prixie overlay listening" },
      { src: "02-heard.webp", t: 0.9 },
      { src: "03-streamA-25.webp", t: 1.9, fade: 0 }, { src: "04-streamA-55.webp", t: 2.7, fade: 0 },
      { src: "05-modeA.webp", t: 3.5, fade: 0, alt: "Jargon definitions, suggested responses and a tone check" },
      { src: "06-streamB.webp", t: 6.0, fade: 0 },
      { src: "07-modeB.webp", t: 6.8, fade: 0, alt: "Direct advice after the user asks Prixie" },
    ], 0.2, true);
    tl.fromTo(wave.children, { scaleY: 0.2 }, { scaleY: 1, duration: 0.6, ease: "expo.out", stagger: { each: 0.012, from: "center" } }, 0.3);
    tl.fromTo(ov, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out" }, 0.1);
    note(tl, root, "“Prixie, …” → direct advice", 5.9, "left:4%;top:8%;");
  };

  /* 05 · Resonate — upload, BPM/key analysis, pitch shift, real Demucs stems, mixer. */
  S.resonate = function (root, tl, o) {
    var b = o.base + "resonate/";
    var dv = device(root, "16 / 10");
    var cam = el("div", "sc-cam", dv.view);
    sequence(tl, cam, b, [
      { src: "01-upload.webp", t: 0, alt: "Resonate upload screen" },
      { src: "02-analysis.webp", t: 1.0, alt: "BPM and key analysis with waveform" },
      { src: "03-pitch.webp", t: 2.8 },
      { src: "04-splitting.webp", t: 4.3 },
      { src: "05-stems.webp", t: 5.6, alt: "Four AI-separated stems: vocals, drums, bass, other" },
      { src: "06-mixer.webp", t: 7.6 },
    ], 0.4);
    note(tl, dv.frame, "Demucs · 4 stems", 5.9);
  };

  /* 06 · gOS — real serial boot log, then the real desktop: files, terminal, calculator, windows. */
  S.gos = function (root, tl, o) {
    var b = o.base + "gos/";
    var term = el("div", "sc-term", root);
    term.setAttribute("data-layout-ignore", ""); // scrolling boot log: texture, not reading text
    var lines = (o.serial || []).slice(0, 9);
    lines.forEach(function (t, i) {
      var l = el("div", "sc-term-line", term, t);
      tl.from(l, { autoAlpha: 0, x: -6, duration: 0.12, ease: "power1.out" }, 0.15 + i * 0.22);
    });
    var dv = device(root, "16 / 10");
    dv.frame.style.zIndex = 2;
    tl.to(term, { autoAlpha: 0, y: -12, duration: 0.3, ease: "power2.in" }, 2.15);
    tl.from(dv.frame, { autoAlpha: 0, scale: 0.94, duration: 0.6, ease: "expo.out" }, 2.45);
    sequence(tl, dv.view, b, [
      { src: "boot-desktop.webp", t: 0, alt: "gOS desktop right after boot" },
      { src: "phase-patchv2_default_boot.webp", t: 3.6 },
      { src: "phase22_restored_fm.webp", t: 4.6, alt: "gOS File Manager on its own FAT32 driver" },
      { src: "phase24_ls.webp", t: 5.6, alt: "gOS terminal listing files" },
      { src: "phase24_calc_19.webp", t: 6.6 },
      { src: "phase21_three_windows.webp", t: 7.6, alt: "Three overlapping windows in the gOS compositor" },
    ], 0.35);
    note(tl, dv.frame, "booted in QEMU · x86_64", 2.9);
  };

  window.Scenes = S;
})();
