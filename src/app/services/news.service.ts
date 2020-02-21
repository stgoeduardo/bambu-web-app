import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    // variables: 
    // url for get news
    mainUrl: string = environment.urlNews;
    // api key for has a permission and get news
    apiKey: string = environment.apiKeyNews;
    // Static array of country objects
    countries: any[] = [
        { id: '1', short: 'mx', name: 'Mexico' },
        { id: '2', short: 'br', name: 'Brasil' },
        { id: '3', short: 'ar', name: 'Argentina' },
        { id: '4', short: 'us', name: 'EE.UU.' }
    ];
    // static array of categories
    categories: string[] = ["general", "business","entertainment","health", "science", "sports"];
    
    // constructor with angularfirestore, angularefireauth and router instances
    constructor(private http: HttpClient) {
    }
    // return static array countriees
    getCountries(): any[] {
        return this.countries;
    }
    // return static array categories
    getCategories(): string[] {
        return this.categories;
    }
    // service that get news on internet, from country and category selected
    getNews(country: string='mx', category: string = 'general'): any {
        let url: string = this.mainUrl + "?country=" + country;
        if (category !== 'general') {
            url += "&category=" + category;
        }
        url += "&apiKey=" + this.apiKey;
        return this.http.get(url)
            .pipe(
                map(data => data),
                catchError(error => error)
            );
    }
}