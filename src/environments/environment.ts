
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAC2bLDP3IBEDtfJrv9Z4PrkKOGJNxeiLE",
    authDomain: "test-web-app-angular.firebaseapp.com",
    databaseURL: "https://test-web-app-angular.firebaseio.com",
    projectId: "test-web-app-angular",
    storageBucket: "test-web-app-angular.appspot.com",
    messagingSenderId: "768352133366",
    appId: "1:768352133366:web:bb25b12da3d45ee4284cd7",
    measurementId: "G-2RVM2SEN3H"
  },
  urlNews: 'http://newsapi.org/v2/top-headlines',
  apiKeyNews: 'c9b3bf15fa934f548352fb1182e983fb'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.