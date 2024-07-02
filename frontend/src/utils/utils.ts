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

export function formatUnixToTimeAgo(unix: number): string {
   const seconds = Math.floor((new Date().getTime() - unix * 1000) / 1000);
   return formatSeconds(seconds) + ' ago';
}

export function capitalizeFirst(string: string): string {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

export function compactNumber(number: number): string {
   if (number === undefined) return '';
   const units = ['', 'k', 'm', 'b', 't'];
   let index = 0;
   while (number >= 1000 && index < units.length - 1) {
      number /= 1000;
      index++;
   }
   return `${number.toFixed(2)} ${units[index]}`;
}

export function formatHashPerSecond(hashRate: number): string {
   if (hashRate === undefined) return '';
   const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s', 'ZH/s'];
   let index = 0;
   while (hashRate >= 1000 && index < units.length - 1) {
      hashRate /= 1000;
      index++;
   }
   return `${hashRate.toFixed(2)} ${units[index]}`;
}