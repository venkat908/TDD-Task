import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringCalculatorService {
  add(numbers: string): number {
    if (!numbers) return 0;

    let delimiter = ',';
    if (numbers.startsWith('//')) {
      const match = numbers.match(/^\/\/(.+)\n(.*)/);
      if (match) {
        delimiter = match[1];
        numbers = match[2];
      }
    }

    delimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex special characters
    const sanitizedNumbers = numbers.replace(/\n/g, delimiter);
    const numArray = sanitizedNumbers.split(new RegExp(delimiter)).map(Number);

    const negatives = numArray.filter((n) => n < 0);
    if (negatives.length) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
    }

    return numArray.reduce((sum, n) => sum + n, 0);
  }
}
