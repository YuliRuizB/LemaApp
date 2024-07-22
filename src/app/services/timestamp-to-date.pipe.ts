import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {
  transform(value: Timestamp | null | undefined): Date | null {
    if (value) {
      return new Date(value.seconds * 1000);
    }
    return null;
  }
}
