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

  constructor(private authService: AuthService,
              private newsService: NewsService,
              private router: Router) { }

  ngOnInit() {
    this.countries = this.newsService.getCountries();
    this.categories = this.newsService.getCategories();
    this.initSearch();
    this.getNews();
  }

  initSearch() {
    //if (localStorage.getItem('user') != null) {
    let tmpUser = JSON.parse(localStorage.getItem('user'));
    this.user = tmpUser.user;
    //}
    this.shortCountrySelected = 'mx';
    this.countrySelected = 'Mexico';
    this.categorySelected = 'general';
  }

  getNews() {
    this.newsService.getNews(this.shortCountrySelected, this.categorySelected).subscribe(data => {
      console.log("Data ", data);
      this.news = [];
      this.news = data.articles;
      this.news.forEach(item => {
        console.log("item ", item.title, item.title.length);
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
        /*if(item.title.length > this.limitText) {
          item.title = item.title.substring(0, this.limitText) + "...";
        }
        if (item.content.length > this.limitText) {
          item.content = item.content.substring(0, this.limitText) + "...";
        }
        if(item.author === null || item.author === '') {
          item.author = "Sin autor.";
        } else {
          if (item.author.length > this.limitText) {
            item.author = item.author.substring(0, this.limitText) + "...";
          }
        }*/
      })
    }, error => {
      console.log("Error ", error);
    })
  }

  changeCategory(event) {
    this.categorySelected = event.target.value;
    console.log(this.categorySelected)
  }

  changeCountry(event) {
    this.shortCountrySelected = event.target.value;
    let foundCountry = this.countries.filter(item => item.short === this.shortCountrySelected);
    if (foundCountry.length > 0) {
      this.countrySelected = foundCountry[0].name;
    }
    console.log("TMP==> ", foundCountry);
  }

  filterNews(isSearch: boolean) {
    console.log("haciendo nueva busqueda => ", this.shortCountrySelected, this.categorySelected)
    if(!isSearch) {
      this.initSearch();
    }
    this.getNews();
  }

  loadDefaultImageWhenFailedUrlImageNew(evt) {
    evt.target.src = 'https://dayton247now.com/resources/media/3c3ebf2b-f922-417f-acd3-14b9a71e0258-large16x9_breakingnews.png?1571176938180';
  }

  goToURL(url: string) {
    window.open(url, '_blank');
  }

  logout() {
    this.authService.logout()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/login'])
      })
      .catch(error => console.log(error));
  }

}

/*
index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>News</title>
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">
  </head>
  <body>
    <nav>
      <ul class="sections">
        <li>
          <img src="img/woolworth.png" alt="Logo" class="logo">
        </li>
        <li style="font-size:30px;font-weight: 900;">Noticias</li>
        <li style="font-size:14px;font-weight: normal;">
          eduardo@bambu-mobile.com <span>Circle</span>
        </li>
      </ul>
    </nav>
    <main>
      <div class="filters">
        <div class="filter-select">
          <select class="filter" name="">
            <option value="">Filtro 1</option>
            <option value="">Filtro 2</option>
          </select>
        </div>
        <div class="filter-select space-left">
          <select class="filter" name="">
            <option value="">Filtro 3</option>
            <option value="">Filtro 4</option>
          </select>
        </div>
      </div>
      <div class="cards">
        <div class="card" style="border: 1px solid red;width: 312px;height: 320px;">
          Card 1
        </div>
        <div class="card" style="border: 1px solid red;width: 312px;height: 320px;">
          Card 1
        </div>
        <div class="card" style="border: 1px solid red;width: 312px;height: 320px;">
          Card 1
        </div>
        <div class="card" style="border: 1px solid red;width: 312px;height: 320px;">
          Card 1
        </div>
        <div class="card" style="border: 1px solid red;width: 312px;height: 320px;">
          Card 1
        </div>
      </div>
      <!--aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkda
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd
      Main aslkdahs d hasdhlsak dklasjd lkasjdlksajdlkasjdlkjaskldjaskldjaslkdjlkasjdlkasjdklsajdlkasjdkljsalkdjsakldjsakldjalksjd-->
    </main>
    <footer>
      Footer
    </footer>
  </body>
</html>

css

* {
  padding: 0;
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  --white: #fff;
  --light: #999;
  --black: #3a3a3a;
  --bambu: #0c3c4a;
  --dark-gray: #636262;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
  border: 1px solid aqua;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
}

nav {
  border: 1px solid red;
  min-height: 80px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.sections {
  border: 1px solid red;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}
.sections > li {
    border: 1px solid blue;
    margin: 0px 32px;
}
.logo {
  width: 168px;
  height: 80px;
}

main {
  border: 1px solid green;
  margin: 0px 108px;
  flex: 1;

  display: flex;
  flex-flow: column nowrap;
}
.filters {
  border: 1px solid orange;
  padding: 8px;
  margin-top: 32px;
  display: flex;
  flex-flow: row wrap;
}
.filter {
  width: 200px;
  height: 48px;
  margin: 0px 40px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  border: 1px solid var(--light, lightgrey);
}
.cards {
  border: 1px solid green;

  margin-top: 32px;
  margin-left: 52px;
  margin-right: 52px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

footer {
  border: 1px solid blue;
  min-height: 35px;
}

*/