"""Prixie: render the real PyQt6 overlay (prixie/overlay.py) offscreen and grab frames.

Text goes in through the overlay's own signals in the exact format brain.py asks Claude for;
the coaching lines are fictional (no microphone, no API calls).
usage: QT_QPA_PLATFORM=offscreen QT_SCALE_FACTOR=2 <venv>/bin/python -I prixie_grab.py <out_dir>
"""
import importlib.util
import sys
from pathlib import Path

from PyQt6.QtWidgets import QApplication

OVERLAY = Path("/Users/gauthamsmacbook/Apps/React Apps/Claude Apps/prixie/prixie/overlay.py")
out = Path(sys.argv[1])
out.mkdir(parents=True, exist_ok=True)

spec = importlib.util.spec_from_file_location("prixie_overlay", OVERLAY)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

app = QApplication(sys.argv)
engine = {"name": "whisper"}
ov = mod.Overlay(on_toggle_engine=lambda: engine["name"], on_toggle_pause=lambda: False)
ov.show()

MODE_A = """[JARGON BUSTER]
- **p95 latency**: 95% of requests finish faster than this number.
- **SLA**: the speed and uptime promise written into the contract.
[SUGGESTED RESPONSE]
- *Confident:* "We can hold p95 under 200 ms if we cache the pricing lookups. I'll share benchmarks by Friday."
- *Buy time:* "Let me benchmark it on real traffic before we commit to a number."
[TONE CHECK]
Technical / Collaborative"""

MODE_B = """[PRIXIE'S ADVICE]
- Agree on the goal first, then trade scope for time.
- Offer a concrete date instead of "later".
[SUGGESTED RESPONSE]
- *Say this:* "I want this launch to land well. If reporting moves to phase two, we can still ship on the 14th."
[TONE CHECK]
Calm / Solution-first"""

n = 0


def grab(name):
    global n
    for _ in range(3):
        app.processEvents()
        ov.adjustSize()
    n += 1
    ov.grab().save(str(out / f"{n:02d}-{name}.png"))


ov.status_signal.emit("listening")
grab("ready")
ov.line_signal.emit("Other", "We'd need p95 under 200 milliseconds before we sign the SLA.")
grab("heard")
# brain.py streams by re-emitting the growing text; capture that growth at whole-line steps
# (a half-received line wraps inconsistently in the QLabel and clips).
lines_a = MODE_A.split("\n")
for k, label in ((3, 25), (5, 55)):
    ov.advice_signal.emit("\n".join(lines_a[:k]), "A")
    grab(f"streamA-{label}")
ov.advice_signal.emit(MODE_A, "A")
grab("modeA")
ov.line_signal.emit("User", "Prixie, how do I push back on the deadline without sounding negative?")
ov.status_signal.emit("direct advisor")
ov.advice_signal.emit("\n".join(MODE_B.split("\n")[:3]), "B")
grab("streamB")
ov.advice_signal.emit(MODE_B, "B")
grab("modeB")
print("prixie frames:", n)
