import { Component } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, DatePipe, UpperCasePipe],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  today = new Date();
}
