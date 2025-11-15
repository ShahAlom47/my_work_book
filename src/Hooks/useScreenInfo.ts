import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down";

interface ScreenInfo {
  width: number;
  height: number;
  scrollY: number;
  scrollDirection: ScrollDirection;
}

const useScreenInfo = (): ScreenInfo => {
  const [screenInfo, setScreenInfo] = useState<ScreenInfo>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    scrollY: 0,
    scrollDirection: "up",
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleResize = () => {
      setScreenInfo((prev) => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight,
      }));
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scroll position didn't change, do nothing
      if (currentScrollY === lastScrollY) return;

      const direction: ScrollDirection = currentScrollY > lastScrollY ? "down" : "up";

      setScreenInfo((prev) => ({
        ...prev,
        scrollY: currentScrollY,
        scrollDirection: direction,
      }));

      lastScrollY = currentScrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    handleResize(); // set initial size

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return screenInfo;
};

export default useScreenInfo;
