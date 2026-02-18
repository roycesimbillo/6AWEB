import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-form.html',
  styleUrls: ['./custom-form.css']
})
export class CustomForm {
  bookTitle = '';
  author = '';
  genre = '';
  published = '';
  rating = '';
  review = '';
  submitted = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.submitted = true;
  }

  navigate(type: 'template' | 'reactive' | 'custom') {
    this.router.navigate(['/' + type]);
  }

  isActive(type: string): boolean {
    return this.router.url.includes(type);
  }
}
