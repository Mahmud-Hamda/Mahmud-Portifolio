import { useEffect, useRef, useState } from "react";

const channel = (value) => {
  const amount = value / 255;
  return amount <= 0.04045 ? amount / 12.92 : ((amount + 0.055) / 1.055) ** 2.4;
};

const luminance = (red, green, blue) =>
  0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue);

const contrast = (left, right) => {
  const lighter = Math.max(left, right);
  const darker = Math.min(left, right);
  return (lighter + 0.05) / (darker + 0.05);
};

const parseHex = (hex) => {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
};

const toHex = (red, green, blue) =>
  `#${[red, green, blue].map((part) => part.toString(16).padStart(2, "0")).join("")}`;

const inkFor = (hex) => {
  const [red, green, blue] = parseHex(hex);
  const color = luminance(red, green, blue);
  const white = contrast(1, color);
  const dark = contrast(luminance(18, 18, 18), color);
  if (white >= 4.5 || white >= dark) return "#fff";
  return "#121212";
};

const readableOnWhite = (hex) => {
  const [red, green, blue] = parseHex(hex);
  if (contrast(luminance(red, green, blue), 1) >= 4.5) return hex;
  for (let step = 1; step <= 100; step += 1) {
    const scale = 1 - step / 100;
    const next = [Math.round(red * scale), Math.round(green * scale), Math.round(blue * scale)];
    if (contrast(luminance(...next), 1) >= 4.5) return toHex(...next);
  }
  return "#121212";
};

const colors = [
  { name: "Indigo", className: "indigo", value: "#6610f2" },
  { name: "Blue", className: "blue", value: "#007bff" },
  { name: "Purple", className: "purple", value: "#6f42c1" },
  { name: "Cyan", className: "cyan", value: "#17a2b8" },
  { name: "Red", className: "red", value: "#dc3545" },
  { name: "Pink", className: "pink", value: "#e83e8c" },
  { name: "Green", className: "green", value: "#28a745" },
  { name: "Yellow", className: "yellow", value: "#ffc107" },
  { name: "Orange", className: "orange", value: "#fd7e14" },
  { name: "Brown", className: "brown", value: "#795548" },
];

const ColorSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const panelRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (open) panel.removeAttribute("inert");
    else panel.setAttribute("inert", "");
  }, [open]);

  const applyColor = (color) => {
    const root = document.documentElement;
    const ink = inkFor(color);
    const type = readableOnWhite(color);
    const [red, green, blue] = parseHex(color);
    const [goldRed, goldGreen, goldBlue] = parseHex("#fcd966");
    const gold = contrast(luminance(red, green, blue), luminance(goldRed, goldGreen, goldBlue));
    root.style.setProperty("--primary", type);
    root.style.setProperty("--primary-ink", inkFor(type));
    root.style.setProperty("--button", color);
    root.style.setProperty("--button-ink", ink);
    root.style.setProperty("--talk", color);
    root.style.setProperty("--talk-ink", ink);
    root.style.setProperty("--footer-hover", gold >= 4.5 ? "#fcd966" : ink);
    setActive(color);
    setOpen(false);
  };

  const resetColor = () => {
    const root = document.documentElement;
    root.style.removeProperty("--primary");
    root.style.removeProperty("--primary-ink");
    root.style.removeProperty("--button");
    root.style.removeProperty("--button-ink");
    root.style.removeProperty("--talk");
    root.style.removeProperty("--talk-ink");
    root.style.removeProperty("--footer-hover");
    setActive("");
    setOpen(false);
  };

  return (
    <div id="styles-switcher" className={open ? "right open" : "right"}>
      <button
        type="button"
        className="switcher-toggle"
        aria-label="Color switcher"
        aria-expanded={open}
        aria-controls="color-switcher-panel"
        onClick={() => setOpen((current) => !current)}
      >
        <i className="fas fa-cog" aria-hidden="true" />
      </button>
      <div id="color-switcher-panel" ref={panelRef}>
        <h2>Color Switcher</h2>
        <hr />
        <ul>
          {colors.map((color) => (
            <li
              key={color.value}
              className={`${color.className}${active === color.value ? " active" : ""}`}
            >
              <button
                type="button"
                aria-label={color.name}
                aria-pressed={active === color.value}
                onClick={() => applyColor(color.value)}
              />
            </li>
          ))}
        </ul>
        <button id="reset-color" type="button" onClick={resetColor}>
          Reset Default Teal
        </button>
      </div>
    </div>
  );
};

export default ColorSwitcher;
