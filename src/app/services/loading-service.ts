import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

private pendingRequests = signal(0);

 loading = signal(false);

  private startTime = 0;

  show(): void {

    this.loading.set(true);

    this.startTime = Date.now();
  }

  hide(): void {

    const elapsed = Date.now() - this.startTime;

    const remaining = Math.max(0, 400 - elapsed);

    setTimeout(() => {

      this.loading.set(false);

    }, remaining);
  }
}
