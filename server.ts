import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import { get } from 'env-var';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {

  console.log("server called");

  const server = express();
  const distFolder = join(process.cwd(), 'dist/travels-ui/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';



  //setup pathways
  //client UI to SSR calls
  const NODE_ENV = get('NODE_ENV').default('dev').asEnum(['dev', 'prod']);
  const LOG_LEVEL = get('LOG_LEVEL').asString();

  const GETWHOAMI =  '/api/whoami';
  const WHOAMI = get('WHOAMI').default('green').asString();
  console.log("server called::WHOAMI", WHOAMI);

  // HTTP and WebSocket traffic both use this port
  const  PORT = get('PORT').default(4200).asPortNumber();

  // external micro services typically running on OpenShift
  const GET_CITIES = '/api/getcities';
  const API_GET_CITIES = get('API_GET_CITIES').asString();

  const GET_DETAILS_FOR_CITY = '/api/getDetailsForCity';
  const API_GET_DETAILS_FOR_CITY = get('API_GET_DETAILS_FOR_CITY').asString();

  const API_MANAGEMENT_FLAG = get('API_MANAGEMENT_FLAG').default("NO").asString();
  const API_USER_KEY_NAME = get('API_USER_KEY_NAME').default('APIKEY').asString();
  const API_USER_KEY_VALUE = get('API_USER_KEY_VALUE').default('iamuser').asString();


  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints

  const bodyParser = require('body-parser');
  const axios = require('axios');

  axios.defaults.headers.common["APIKEY"] = API_USER_KEY_VALUE // for all requests
  

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: true}) );

  /**
   * custom API Calls - BEGIN
  **/

 // Get Product Details based on Product IDs
 server.get(GETWHOAMI, (req, res) => {
  console.log("WHOAMI", WHOAMI)
    res.send("{\"travelId\" : \"" + WHOAMI+ " \"}");
  });

 server.get(GET_CITIES, (req, res) => {
  
  console.log("GET_CITIES invoked")
  var url = API_GET_CITIES;
  if (API_USER_KEY_VALUE!=null && API_USER_KEY_VALUE!="") {
    url = url + "?" + API_USER_KEY_NAME + "=" + API_USER_KEY_VALUE;
  }

  console.log("GET_CITIES Url is: " + url);

  axios.get(url)
    .then((response: any) => {
      console.log("GET_CITIES response.data", response.data)
      res.send(response.data);
    })
    .catch((error: any) => { 
      console.log("GET_CITIES Error Code", error.code); 
      console.log("GET_CITIES Error Response Status", error.response.status); 
      if(error.code == 'ENOTFOUND'){
        res.status(404).send(url + "URL unknown");
      } else {
        res.status(error.response.status).send(error.response.data);
      }
    });

  });

  server.get(GET_DETAILS_FOR_CITY, (req, res) => {
    console.log("GET_DETAILS_FOR_CITY invoke for city:" + city);
    var city =  req.query["city"]
    var url = API_GET_DETAILS_FOR_CITY + "/" + city;
    if (API_USER_KEY_VALUE!=null && API_USER_KEY_VALUE!="") {
      url = url + "?" + API_USER_KEY_NAME + "=" + API_USER_KEY_VALUE;
    }

    console.log("GET_DETAILS_FOR_CITY Url is>>" + url + "<<");

    axios
      .get(url)
      .then((response: any) => {
        console.log("GET_DETAILS_FOR_CITY response.data", response.data)
        res.send(response.data);
      })
      .catch((error: any) => { 
        console.log("GET_DETAILS_FOR_CITY", error.response); 
        res.status(error.response.status).send();
      });
  });


  /**
   * custom API Calls - BEGIN
  **/


  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {

  const port = process.env['PORT'] || 4200;
  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
