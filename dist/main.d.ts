declare const useScroll: () => {
  scrollY: number;
  scrollX: number;
  scrollDirection: "" | "down" | "up";
};

export default useScroll;
export { useScroll };
