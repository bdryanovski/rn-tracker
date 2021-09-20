/**
 * Date functions.
 */

export function addDays(start, numberOfDays) {
  const now = new Date(start);
  now.setDate(now.getDate() + numberOfDays);
  return now.getTime();
}

export function removeDays(start, numberOfDays) {
  const now = new Date(start);
  now.setDate(now.getDate() - numberOfDays);
  return now.getTime();
}

export function dateToday() {
  return new Date().getTime();
}

export function dateYesterday() {
  return removeDays(dateToday(), 1);
}

export function isToday(timestamp) {
  const time = new Date(timestamp);
  const now = new Date();

  return (
    time.getDate() === now.getDate() &&
    time.getMonth() === now.getMonth() &&
    time.getFullYear() === now.getFullYear()
  );
}

export function isYesterday(timestamp) {
  const time = new Date(timestamp);
  const now = new Date(dateYesterday());

  return (
    time.getDate() === now.getDate() &&
    time.getMonth() === now.getMonth() &&
    time.getFullYear() === now.getFullYear()
  );
}
