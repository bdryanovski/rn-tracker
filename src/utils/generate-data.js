import { dateToday, dateYesterday, removeDays } from './date';

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (min - max) + max);
}

export function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomArray(min, max, method) {
  return Array(randomNumber(min, max)).fill().map(method);
}

const listTracks = ['Coffee', 'Water', 'Dog walks', 'BMW S1000RR'];
const listUnits = ['cups', 'times', 'milliliters', 'today'];

export function GenerateTrackers() {
  const data = [
    // Today
    {
      date: dateToday(),
      data: [
        ...randomArray(1, 5, () => {
          const limit = randomNumber(1, 100);
          const value = randomNumber(1, limit);
          return {
            date: dateToday(),
            title: randomElement(listTracks),
            unit: randomElement(listUnits),
            value: value,
            dayLimit: limit,
          };
        }),
      ],
    },
    // Yesterday
    {
      date: dateYesterday(),
      data: [
        ...randomArray(1, 4, () => {
          const limit = randomNumber(1, 100);
          const value = randomNumber(1, limit);
          return {
            date: dateYesterday(),
            title: randomElement(listTracks),
            unit: randomElement(listUnits),
            value: value,
            dayLimit: limit,
          };
        }),
      ],
    },
  ];

  console.log(data[0]);

  return [
    ...data,
    ...randomArray(1, 15, (v, index) => {
      const d = removeDays(dateToday(), index - 2);
      return {
        date: d,
        data: [
          ...randomArray(1, 10, () => {
            const limit = randomNumber(1, 100);
            const value = randomNumber(1, limit);
            return {
              date: d,
              title: randomElement(listTracks),
              unit: randomElement(listUnits),
              value: value,
              dayLimit: limit,
            };
          }),
        ],
      };
    }),
  ];
}
