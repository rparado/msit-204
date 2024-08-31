import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private countSubject = new BehaviorSubject<number>(this.getStoredCount());
  count$ = this.countSubject.asObservable();

  constructor() { }

  private getStoredCount(): number {
    const storedValue = localStorage.getItem('billCount');
    const count = storedValue ? parseInt(storedValue, 10) : 0;
    return isNaN(count) ? 0 : count;
  }

  updateCount(value: number): void {
    // Only update if the new value is different from the current one
    if (value !== this.countSubject.getValue()) {
      this.countSubject.next(value);
      localStorage.setItem('billCount', value.toString());
    }
  }
}
