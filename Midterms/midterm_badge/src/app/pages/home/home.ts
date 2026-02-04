import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { DataService, Post } from '../../services/data';
import { TruncatePipe } from '../../pipes/truncate-pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  latestPosts$: Observable<Post[]>;

  constructor(data: DataService) {
    this.latestPosts$ = data.getPosts().pipe(
      map((p: Post[]) => p.slice(0, 5))
    );
  }
}
