export function formatBytes(bytes: number): string {
   if (bytes === undefined) return '';
   const units = ['B', 'KB', 'MB', 'GB', 'TB'];
   let index = 0;
   while (bytes >= 1000 && index < units.length - 1) {
      bytes /= 1000;
      index++;
   }
   return `${bytes.toFixed(2)} ${units[index]}`;
}

export function formatLargeNumber(number: number): string {
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatSeconds(seconds: number): string {
   if (seconds === undefined) return '';
   const units = ['seconds', 'minutes', 'hours', 'days', 'months'];
   const conversions = [60, 60, 24, 30];
   let index = 0;
   while (seconds >= conversions[index] && index < units.length - 1) {
      seconds /= conversions[index];
      index++;
   }
   return `${seconds.toFixed(0)} ${units[index]}`;
}