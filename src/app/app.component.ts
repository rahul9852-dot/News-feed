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
    this.newsapi.initArticles().subscribe(data => 
        this.mArticles= Object.values(data)[2] as Array<keyof typeof data>
        
      )


    // load news sources
    this.newsapi.initSource().subscribe(source => 
      // console.log(source)
      this.mSources= Object.values(source)[1] as Array<keyof typeof source>
    )
  }

  // serachArticles 
  searchArticles(source: any){
    console.log("selected source is:"+ source);
    this.newsapi.getArticleByID(source).subscribe(data => 
        this.mArticles = Object.values(data)[2] as Array<keyof typeof source>
      )
  }
  
}
