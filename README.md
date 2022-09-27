# TravelsUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.
This also has "Server-side rendering (SSR) with Angular Universal" enables. Read more about this here: https://angular.io/guide/universal

# I. Development server - Local environment

## A. Instructions to setup
* Run `npm install` for the first time in local environment.

* Run `npm run dev:ssr` for running this as server side app. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

*  Setup  these environment variables
** API_GET_CITIES - API  pointing to the Istio travels endpoint
** API_GET_DETAILS_FOR_CITY- API  pointing to the Istio travels endpoint
** WHOMI - the valid values are: red, green, blue


## B. Setup env variables In local env

```
export API_GET_CITIES=http://cc63cf69-7b14-4ea3-9588-b6b3ec2cf39d.mock.pstmn.io/travels
export API_GET_DETAILS_FOR_CITY=http://cc63cf69-7b14-4ea3-9588-b6b3ec2cf39d.mock.pstmn.io/travels/London
export WHOMI=green
export API_USER_KEY_NAME=user_key /** this  is the api key name as per 3Scale application plan **/
export API_USER_KEY_VALUE="23456789" /** this  is the api key value as per 3Scale application plan **/
```

## C. Accessing the portal
http://localhost:4200


## D. Docker build
```
    docker build . -t quay.io/redhat-servicemesh-apim-demo/travels-demo-ui
```



# II. Setup for OpenShift for production deployment

### Import the container image 
* quay.io/redhat-servicemesh-apim-demo/travels-demo-ui
* expose route 

### Create the following environment variables
```
NODE_ENV=prod
PORT=8080
WHOMI=green
API_GET_CITIES=<url> /*this is  the Istio Travels endpoint*/
API_GET_DETAILS_FOR_CITY=<url> /*this is the Istio Travels endpoint*/
API_USER_KEY_NAME=<api_key_nsame> /** this  is the api key name as per 3Scale application plan **/
API_USER_KEY_VALUE=<api_key_value> /** this  is the api key value as per 3Scale application plan **/

```
