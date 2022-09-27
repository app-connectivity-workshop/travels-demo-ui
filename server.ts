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


  // HTTP and WebSocket traffic both use this port
  const  PORT = get('PORT').default(4200).asPortNumber();

  // external micro services typically running on OpenShift
  const GET_CITIES = '/api/getcities';
  const API_GET_CITIES = get('API_GET_CITIES').default('http://cc63cf69-7b14-4ea3-9588-b6b3ec2cf39d.mock.pstmn.io/travels').asString();
  
  const GET_DETAILS_FOR_CITY = '/api/getDetailsForCity';
  const API_GET_DETAILS_FOR_CITY = get('API_GET_DETAILS_FOR_CITY').default('http:/cc63cf69-7b14-4ea3-9588-b6b3ec2cf39d.mock.pstmn.io/travels').asString();
  
  const API_MANAGEMENT_FLAG = get('API_MANAGEMENT_FLAG').default("NO").asString();  
  const API_USER_KEY_NAME = get('USER_KEY').default('api_key').asString();
  const API_USER_KEY_VALUE = get('API_USER_KEY_VALUE').default('8efad5cc78ecbbb7dbb8d06b04596aeb').asString();
  
  
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints

  const bodyParser = require('body-parser');
  const axios = require('axios');
  
  if(API_MANAGEMENT_FLAG && API_MANAGEMENT_FLAG =='YES') {
    axios.defaults.headers.common[API_USER_KEY_NAME] = API_USER_KEY_VALUE // for all requests
  }

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: true}) );
  
  /** 
   * custom API Calls - BEGIN
  **/

 // Get Product Details based on Product IDs
 server.get(GET_CITIES, (req, res) => {
  //res.send(cities);
  console.log("GET_CITIES invoked")
  var url = API_GET_CITIES;
  axios
    .get(url)
    .then((response: any) => {
      console.log("GET_CITIES response.data", response.data)
      res.send(response.data);
    })
    .catch((error: any) => { console.log("GET_CITIES", error); });
  
  });

  server.get(GET_DETAILS_FOR_CITY, (req, res) => {
    var city =  req.query["city"]
    var url = API_GET_DETAILS_FOR_CITY;

    console.log("GET_DETAILS_FOR_CITY invoke for city:" + city);
    console.log("GET_DETAILS_FOR_CITY invokedURL:" + get('API_GET_DETAILS_FOR_CITY').asString());

    axios
      .get(API_GET_DETAILS_FOR_CITY + "/" + city)
      .then((response: any) => {
        console.log("GET_DETAILS_FOR_CITY response.data", response.data)
        res.send(response.data);
      })
      .catch((error: any) => { console.log("GET_DETAILS_FOR_CITY", error); });
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


const cities = [
  {
    "city": "Amsterdam",
    "lat": 52.35,
    "long": 4.9166
  },
  {
    "city": "Andorra",
    "lat": 42.5,
    "long": 1.5165
  },
  {
    "city": "Athens",
    "lat": 37.9833,
    "long": 23.7333
  },
  {
    "city": "Belgrade",
    "lat": 44.8186,
    "long": 20.468
  },
  {
    "city": "Berlin",
    "lat": 52.5218,
    "long": 13.4015
  },
  {
    "city": "Bern",
    "lat": 46.9167,
    "long": 7.467
  },
  {
    "city": "Bratislava",
    "lat": 48.15,
    "long": 17.117
  },
  {
    "city": "Brussels",
    "lat": 50.8333,
    "long": 4.3333
  },
  {
    "city": "Bucharest",
    "lat": 44.4334,
    "long": 26.0999
  },
  {
    "city": "Budapest",
    "lat": 47.5,
    "long": 19.0833
  },
  {
    "city": "Chisinau",
    "lat": 47.005,
    "long": 28.8577
  },
  {
    "city": "Copenhagen",
    "lat": 55.6786,
    "long": 12.5635
  },
  {
    "city": "Dublin",
    "lat": 53.3331,
    "long": -6.2489
  },
  {
    "city": "Helsinki",
    "lat": 60.1756,
    "long": 24.9341
  },
  {
    "city": "Kiev",
    "lat": 50.473782,
    "long": 30.516237
  },
  {
    "city": "Lisbon",
    "lat": 38.7227,
    "long": -9.1449
  },
  {
    "city": "Ljubljana",
    "lat": 46.0553,
    "long": 14.515
  },
  {
    "city": "London",
    "lat": 51.5,
    "long": -0.1167
  },
  {
    "city": "Luxembourg",
    "lat": 49.6117,
    "long": 6.13
  },
  {
    "city": "Madrid",
    "lat": 40.4,
    "long": -3.6834
  },
  {
    "city": "Minsk",
    "lat": 53.9,
    "long": 27.5666
  },
  {
    "city": "Monaco",
    "lat": 43.7396,
    "long": 7.4069
  },
  {
    "city": "Moscow",
    "lat": 55.7522,
    "long": 37.6155
  },
  {
    "city": "Nicosia",
    "lat": 35.1667,
    "long": 33.3666
  },
  {
    "city": "Nuuk",
    "lat": 64.1983,
    "long": -51.7327
  },
  {
    "city": "Oslo",
    "lat": 59.9167,
    "long": 10.75
  },
  {
    "city": "Paris",
    "lat": 48.8667,
    "long": 2.3333
  },
  {
    "city": "Podgorica",
    "lat": 42.466,
    "long": 19.2663
  },
  {
    "city": "Prague",
    "lat": 50.0833,
    "long": 14.466
  },
  {
    "city": "Reykjavik",
    "lat": 64.15,
    "long": -21.95
  },
  {
    "city": "Riga",
    "lat": 56.95,
    "long": 24.1
  },
  {
    "city": "Rome",
    "lat": 41.896,
    "long": 12.4833
  },
  {
    "city": "SanMarino",
    "lat": 43.9172,
    "long": 12.4667
  },
  {
    "city": "Sarajevo",
    "lat": 43.85,
    "long": 18.383
  },
  {
    "city": "Skopje",
    "lat": 42,
    "long": 21.4335
  },
  {
    "city": "Sofia",
    "lat": 42.6833,
    "long": 23.3167
  },
  {
    "city": "Stockholm",
    "lat": 59.3508,
    "long": 18.0973
  },
  {
    "city": "Tallinn",
    "lat": 59.4339,
    "long": 24.728
  },
  {
    "city": "Tirana",
    "lat": 41.3275,
    "long": 19.8189
  },
  {
    "city": "Vaduz",
    "lat": 47.1337,
    "long": 9.5167
  },
  {
    "city": "Valletta",
    "lat": 35.8997,
    "long": 14.5147
  },
  {
    "city": "Vienna",
    "lat": 48.2,
    "long": 16.3666
  },
  {
    "city": "Vilnius",
    "lat": 54.6834,
    "long": 25.3166
  },
  {
    "city": "Warsaw",
    "lat": 52.25,
    "long": 21
  },
  {
    "city": "Zagreb",
    "lat": 45.8,
    "long": 16
  }
];