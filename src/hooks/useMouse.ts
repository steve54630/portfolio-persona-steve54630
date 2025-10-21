import { useEffect, useState } from "react";

export default function useMouseActivity() {
  const [mouseActivity, setMouseActivity] = useState(false);
  const [showHelp, setShowHelp] = useState(true);

  useEffect(() => {
    const mouseMoveListener = () => {
      if (mouseActivity) return;
      setMouseActivity(true);
      setShowHelp(false);
    };

    const keyDownListener = () => {
      if (mouseActivity) {
        setMouseActivity(false);
      }
      setShowHelp(true);
    };

    window.addEventListener("mousemove", mouseMoveListener);
    window.addEventListener("keydown", keyDownListener);

    return () => {
      window.removeEventListener("mousemove", mouseMoveListener);
      window.removeEventListener("keydown", keyDownListener);
    };
  }, [mouseActivity]);

  return showHelp;
}
