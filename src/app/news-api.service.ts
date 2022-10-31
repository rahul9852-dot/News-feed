import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  api_key = 'b94aaf865e774140bfa15f0eedd0ff49'
 
  constructor(private http: HttpClient) { }

  initSource(){
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey='+this.api_key)
  }

  initArticles(){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+this.api_key)
  }

  getArticleByID(source:String){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+this.api_key)
  }
}
