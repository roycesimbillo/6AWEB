import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { combineLatest, map, startWith, Observable } from 'rxjs';
import { DataService, Post } from '../../services/data';
import { TruncatePipe } from '../../pipes/truncate-pipe';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TruncatePipe],
  templateUrl: './service.html',
  styleUrl: './service.css'
})
export class ServicesComponent {

  search = new FormControl<string>('');
  posts$: Observable<Post[]>;

  constructor(data: DataService) {
    this.posts$ = combineLatest([
      data.getPosts(),
      this.search.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([posts, text]) =>
        posts.filter((p: Post) =>
          p.title.toLowerCase().includes(text!.toLowerCase()) ||
          p.body.toLowerCase().includes(text!.toLowerCase())
        )
      )
    );
  }
}
