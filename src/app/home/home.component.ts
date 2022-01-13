import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  search() {
  }
}
