import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../../core/models/user';

@Injectable()
export class DetailStateService {

  private user: User | null = null;
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(this.user);

  constructor() { }

  setUser(user: User) {
    this.user = user;
    this.user$.next(this.user);
  }

  getUser(): User | null {
    return this.user;
  }
}
