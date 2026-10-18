import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let currentRotation = 0;
    let frame = 0;
    let hasPosition = false;

    const animate = () => {
      const easing = reducedMotion.matches ? 1 : 0.2;
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;
      const nextRotation = Math.max(-12, Math.min(12, (targetX - currentX) * 0.45));
      currentRotation += (nextRotation - currentRotation) * easing;

      cursor.style.setProperty("--cursor-x", `${currentX}px`);
      cursor.style.setProperty("--cursor-y", `${currentY}px`);
      cursor.style.setProperty("--cursor-rotation", `${currentRotation}deg`);

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1 ||
        Math.abs(currentRotation) > 0.1
      ) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasPosition) {
        currentX = targetX;
        currentY = targetY;
        hasPosition = true;
      }
      if (!frame) frame = window.requestAnimationFrame(animate);
      cursor.dataset["visible"] = "true";
      cursor.dataset["hovering"] = String(
        event.target instanceof Element &&
          Boolean(event.target.closest("a, button, input, textarea, select, [role='button']")),
      );
    };
    const press = () => {
      cursor.dataset["pressed"] = "true";
    };
    const release = () => {
      cursor.dataset["pressed"] = "false";
    };
    const leave = () => {
      cursor.dataset["visible"] = "false";
      cursor.dataset["pressed"] = "false";
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", leave);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", leave);
      document.documentElement.removeEventListener("pointerleave", leave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <img className="custom-cursor-bow" src="/assets/bow.svg" alt="" draggable={false} />
      <img className="custom-cursor-mickey" src="/assets/mickey.svg" alt="" draggable={false} />
    </div>
  );
}
