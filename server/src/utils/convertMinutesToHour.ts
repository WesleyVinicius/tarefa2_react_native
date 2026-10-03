export default function convertMinutesToHour(minutes: number) {
  const hour = String(Math.floor(minutes / 60)).padStart(2, '0');
  const min = String(minutes % 60).padStart(2, '0');

  return `${hour}:${min}`;
}