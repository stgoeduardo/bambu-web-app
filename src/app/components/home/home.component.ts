import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  countries: any[];
  categories: string[];
  news: any[] = [];
  shortCountrySelected: string;
  countrySelected: string;
  categorySelected: string;
  limitText: number = 25;

  // constructor with authservice, newservice and router instances
  constructor(private authService: AuthService,
              private newsService: NewsService,
              private router: Router) { }

  ngOnInit() {
    this.countries = this.newsService.getCountries();
    this.categories = this.newsService.getCategories();
    this.initSearch();
    this.getNews();
  }
  // set keys for search news and get user from storage
  initSearch() {
    let tmpUser = JSON.parse(localStorage.getItem('user'));
    this.user = tmpUser.user;
    this.shortCountrySelected = 'mx';
    this.countrySelected = 'Mexico';
    this.categorySelected = 'general';
  }
  // get news from variables of shor country and category
  getNews() {
    this.newsService.getNews(this.shortCountrySelected, this.categorySelected).subscribe(data => {
      this.news = [];
      this.news = data.articles;
      this.news.forEach(item => {
        if (item.title){
          item.title = (item.title.length > this.limitText) ? item.title.substring(0, this.limitText) + "..." : item.title ;
        }
        if (item.content) {
          item.content = (item.content.length > this.limitText) ? item.content.substring(0, this.limitText) + "..." : item.content;
        }
        if (item.author) {
          item.author = (item.author.length > this.limitText) ? item.author.substring(0, this.limitText) + "..." : item.author;
        } else {
          item.author = "Sin autor.";
        }
      })
    }, error => {
      console.log("Error ", error);
    })
  }
  // When select new category, get new value and save them in categorySelected
  changeCategory(event) {
    this.categorySelected = event.target.value;
  }
  // When select new country, get new value and save them in countrySelected
  changeCountry(event) {
    this.shortCountrySelected = event.target.value;
    let foundCountry = this.countries.filter(item => item.short === this.shortCountrySelected);
    if (foundCountry.length > 0) {
      this.countrySelected = foundCountry[0].name;
    }
  }
  // when i get my two variables selected, execute request for get news
  filterNews(isSearch: boolean) {
    if(!isSearch) {
      this.initSearch();
    }
    this.getNews();
  }
  // when url image fail, i set default image from web
  loadDefaultImageWhenFailedUrlImageNew(evt) {
    evt.target.src = 'https://dayton247now.com/resources/media/3c3ebf2b-f922-417f-acd3-14b9a71e0258-large16x9_breakingnews.png?1571176938180';
  }
  // Go to new on the internet
  goToURL(url: string) {
    window.open(url, '_blank');
  }
  // logout user
  logout() {
    this.authService.logout()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/login'])
      })
      .catch(error => console.log(error));
  }

}