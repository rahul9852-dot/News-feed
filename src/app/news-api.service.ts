import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { res, StatusObj } from './app.component';
@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  api_key = 'b94aaf865e774140bfa15f0eedd0ff49'
 
  constructor(private http: HttpClient) { }

  initSource(): Observable<StatusObj>{
    return this.http.get<StatusObj>('https://newsapi.org/v2/sources?language=en&apiKey='+this.api_key).pipe(map(response => ({
      status: response.status,
      sources: response.sources
  })))
  
  }

  initArticles(): Observable<res>{
    return this.http.get<res>('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+this.api_key).pipe(map(response => ({
      articles: response.articles,
      status: response.status,
      totalResults: Number(response.totalResults)
  })))
  
  }

  getArticleByID(source:String){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+this.api_key)

  }
}
