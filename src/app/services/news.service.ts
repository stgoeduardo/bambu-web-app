import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { HttpClient } from '@angular/common/http';

import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    
    mainUrl: string = environment.urlNews;
    apiKey: string = environment.apiKeyNews;
    countries: any[] = [
        { id: '1', short: 'mx', name: 'Mexico' },
        { id: '2', short: 'br', name: 'Brasil' },
        { id: '3', short: 'ar', name: 'Argentina' },
        { id: '4', short: 'us', name: 'EE.UU.' }
    ];
    categories: string[] = ["general", "business","entertainment","health", "science", "sports"];

    constructor(private http: HttpClient) {
        
    }

    getCountries(): any[] {
        return this.countries;
    }

    getCategories(): string[] {
        return this.categories;
    }

    getNews(country: string='mx', category: string = 'general'): any {
        //let url: string = this.mainUrl + "?country&apiKey=" + this.apiKey;
        let url: string = this.mainUrl + "?country=" + country;
        if (category !== 'general') {
            url += "&category=" + category;
        }
        url += "&apiKey=" + this.apiKey;
        console.log("url ", url);
        
        return this.http.get(url)
            .pipe(
                map(data => data),
                catchError(error => error)
            );

        /*return this.http.get(url)
        .subscribe(
            data => data,
            error => error);*/
    }



}