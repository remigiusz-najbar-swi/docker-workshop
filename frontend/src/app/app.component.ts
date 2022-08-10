import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from './article/Article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private http: HttpClient) {}

  articles!: Article[];

  onClick(): void {
    this.http.post(`${environment.apiUrl}/article`, {
      title: "test",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis et debitis, voluptatem facere neque unde dolore, voluptatibus saepe ut, quibusdam commodi? Labore, ducimus? Voluptatibus cupiditate quod commodi distinctio dolorem rerum corporis beatae possimus iste minus illum, aliquid provident. Laboriosam, ullam mollitia soluta odit a hic eveniet! Beatae pariatur libero voluptatibus sapiente eveniet, obcaecati unde maxime eos rem reiciendis. Laboriosam dolorum, at sit id commodi unde eveniet iure quisquam quibusdam aliquid, neque aut inventore aliquam vitae officiis! Sequi distinctio voluptatem laboriosam fuga itaque, nihil in explicabo ullam sunt autem vitae maiores necessitatibus perspiciatis totam quia accusantium veniam dolore. Quos reprehenderit alias, vitae iste asperiores ipsam nihil similique, nesciunt itaque voluptate optio. Adipisci vel ad, magni voluptate eius placeat. Eius vel enim minima, animi porro quasi quis, laudantium cupiditate harum quisquam iste consequatur ullam cumque, expedita quae excepturi molestiae minus et? Hic ullam, sit maxime quo quisquam saepe laudantium unde facere eum!"
    }).subscribe();
  }

  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}/articles`).subscribe((articles: any) => {
      this.articles = articles;
    });
  }
  title = 'frontend';
}
