import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../articles.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article';
import { AppState } from 'src/app/model/app-state.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  articles$: Observable<Array<Article>>;

  public articles: string[];
  constructor(
    private store: Store<AppState>,
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit(): void {
    this.articles$ = this.store.select((store) => store.articles);

    this.articlesService.articles = new Array<string>();
    this.articlesService.fetchArticles();

    this.articlesService.articlesChanged.subscribe((articles: string[]) => {
      this.articles = articles;
    });
  }

  showEditor(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
