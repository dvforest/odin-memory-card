export async function preloadImages(deck) {
  return Promise.all(
    deck.map((card) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = card.sprite;
        img.onload = resolve;
      });
    }),
  );
}
