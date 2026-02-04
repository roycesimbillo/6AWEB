import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {

  private url = 'https://jsonplaceholder.typicode.com/posts';
  private posts$!: Observable<Post[]>;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    if (!this.posts$) {
      this.posts$ = this.http.get<Post[]>(this.url).pipe(
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.posts$;
  }
}
