# TravelsUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.
This also has "Server-side rendering (SSR) with Angular Universal" enables. Read more about this here: https://angular.io/guide/universal

## Development server

* Run `npm install` for the first time in local environment.

* Run `npm run dev:ssr` for running this as server side app. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

*  tSetup  two environment variables pointing to the Istio travels endpoint
** API_GET_CITIES
** API_GET_DETAILS_FOR_CITY

* Accessing various versions for the portal
http://localhost:4200/travel/red
http://localhost:4200/travel/green
http://localhost:4200/travel/blue



## Docker build

docker build . -t quay.io/redhat-servicemesh-apim-demo/travels-demo-ui
