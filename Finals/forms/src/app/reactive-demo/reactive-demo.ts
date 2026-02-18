import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive-demo',
  templateUrl: './reactive-demo.html',
  imports: [ReactiveFormsModule, FormsModule],
  styleUrls: ['./reactive-demo.css']
})
export class ReactiveDemo {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    console.log("Reactive Form:", this.myForm.value);
  }

  navigate(type: 'template' | 'reactive' | 'custom') {
    this.router.navigate(['/' + type]);
  }

  isActive(type: string): boolean {
    return this.router.url.includes(type);
  }
}
