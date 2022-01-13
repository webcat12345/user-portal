import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, Subject, takeUntil, throwError } from 'rxjs';

import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoading = false;
  hasError = false;
  form: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
  });

  private unsubscribeAll: Subject<null> = new Subject();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(() => this.hasError = false);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  search() {
    if (this.form.invalid) {
      return;
    }
    const id = this.form.value.id;

    this.isLoading = true;
    this.userService.getUserById(id).pipe(
      finalize(() => this.isLoading = false),
      catchError(err => {
        this.hasError = true;
        return throwError(err);
      })
    ).subscribe(user => {
      this.router.navigate([this.form.value.id]);
    });
  }
}
