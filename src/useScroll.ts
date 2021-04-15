import {
  useState,
  useEffect,
  useCallback,
} from "react";

export const useScroll = () => {
  const [state, setState] = useState<{
    lastScrollTop: number;
    bodyOffset: DOMRect;
    scrollY: number;
    scrollX: number;
    scrollDirection: "down" | "up" | "";
  }>({
    lastScrollTop: 0,
    bodyOffset: document.body.getBoundingClientRect(),
    scrollY: document.body.getBoundingClientRect()
      .top,
    scrollX: document.body.getBoundingClientRect()
      .left,
    scrollDirection: "",
  });

  const handleScrollEvent = useCallback((_) => {
    setState((prevState: any) => {
      const prevLastScrollTop =
        prevState.lastScrollTop;
      const bodyOffset = document.body.getBoundingClientRect();

      return {
        bodyOffset: bodyOffset,
        scrollY: -bodyOffset.top,
        scrollX: bodyOffset.left,
        scrollDirection:
          prevLastScrollTop > -bodyOffset.top
            ? "down"
            : "up",
        lastScrollTop: -bodyOffset.top,
      };
    });
  }, []);

  useEffect(() => {
    const scrollListener = (e: any) => {
      handleScrollEvent(e);
    };
    window.addEventListener(
      "scroll",
      scrollListener
    );

    return () => {
      window.removeEventListener(
        "scroll",
        scrollListener
      );
    };
  }, [handleScrollEvent]);

  return {
    scrollY: state.scrollY,
    scrollX: state.scrollX,
    scrollDirection: state.scrollDirection,
  };
};

export default useScroll;
