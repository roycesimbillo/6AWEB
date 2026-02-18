import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-demo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-demo.html',
  styleUrl: './template-demo.css'
})
export class TemplateDemo {
  title = 'Template Driven Demo';
  username = '';
  email = '';
  password = '';
  role = '';
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
