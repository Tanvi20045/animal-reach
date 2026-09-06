// Adds a Material-style ripple circle at the click position.
// The clicked element needs className "ripple-container" (position:relative, overflow:hidden).
export function createRipple(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const span = document.createElement("span");
  span.className = "ripple-span";
  const size = 20;
  span.style.width = size + "px";
  span.style.height = size + "px";
  span.style.left = e.clientX - rect.left - size / 2 + "px";
  span.style.top = e.clientY - rect.top - size / 2 + "px";
  el.appendChild(span);
  setTimeout(() => span.remove(), 600);
}