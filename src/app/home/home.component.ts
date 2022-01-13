import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading = false;
  form: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  search() {
    if (this.form.invalid) {
      return;
    }
    const id = this.form.value.id;

    this.isLoading = true;
    this.userService.getUserById(id).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(user => {
      this.router.navigate([this.form.value.id] );
    });
  }
}
