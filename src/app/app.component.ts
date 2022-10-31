import { Component } from '@angular/core';
import { NewsApiService } from './news-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mArticles: Array<any> =[];
  mSources:Array<any> =[];

  constructor(private newsapi: NewsApiService){
    console.log('app constructor component called!');
  }

  ngOnInit(){
    // load articles 
    this.newsapi.initArticles().subscribe(data => {
      console.log(data)
      data.articles.forEach(article => {
        this.mArticles.push({
          author: article.author,
          title: article.title,
          description: article.description,
          url: article.description,
          source: article.source,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          content: article.content,
          likes: 0,
          dislikes: 0
        })
      });
    })
    console.log("article",this.mArticles)
    // load news sources
    this.newsapi.initSource().subscribe(sourceObj => 
      sourceObj.sources.forEach(source => {
        this.mSources.push({
          id: source.id,
          name: source.name,
          description: source.description,
          url: source.url,
          category: source.category,
          language: source.language,
          country: source.country
        })
      })
      // this.mSources= Object.values(source)[1] as Array<keyof typeof source>
    )
    console.log("source",this.mSources);
    
  }

  // serachArticles 
  searchArticles(source: any){
    console.log("selected source is:"+ source);
    this.newsapi.getArticleByID(source).subscribe(data => 
        this.mArticles = Object.values(data)[2] as Array<keyof typeof source>
      )
  }

  increment(i: any){
    this.mArticles[i].likes++;
  }

  decrement(i: any){
    this.mArticles[i].dislikes++;
  }
  
}

interface Post {
  author: string,
  title: string,
  description: string,
  source: ArticleSource
  url: string,
  urlToImage: string,
  publishedAt: Date,
  content: string,
  likes: Number,
  dislikes: Number
}


interface SourceDescription{
    id: string,
    name: string,
    description: string,
    url: string,
    category: string,
    language: string,
    country: string
}


export interface res {
  "status": string,
  "articles": Post[],
  "totalResults": Number,
}

export interface StatusObj {
  "status": string,
  "sources": SourceDescription[]
}

interface ArticleSource {
  name: string,
  id: string
}
