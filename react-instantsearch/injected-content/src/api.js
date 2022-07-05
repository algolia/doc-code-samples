const data = {
  book: {
    title: '"All About Spices" book: 30% off now',
    image: 'spices.jpg',
  },
  snacks: {
    title: 'Healthy vegetarian snacks',
    image: 'veggie-snacks.jpg',
  },
};

export const api = {
  get(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data[id]);
      }, 500);
    });
  },
};
