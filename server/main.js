import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {
  //create and register new middleware function
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({_id});

    if(link) {
      //set HTTP status code to 302 - redirect
      res.statusCode = 302;

      //set Location header to actual url
      res.setHeader('Location', link.url);

      res.end();

      Meteor.call('links.trackVisit', _id);
    }
    else {
      next();
    }
  });

  // // code to run on server at startup
  // WebApp.connectHandlers.use((req, res, next) => {
  //   console.log('middleware loaded');
  //   //console.log(req);
  //   console.log(req.url, req.method, req.headers, req.query);
  //
  //   //set HTTP status code httpstatuses.com
  //   //res.statusCode = 404;
  //
  //   //set HTTP headers
  //   //res.setHeader('my-custom-header', 'jheada');
  //
  //   //set HTTP body - depreciated -- check updated
  //   //res.write('<h1>middleware workin\'</h1>');
  //
  //   //end HTTP request - depcreciated?
  //   //res.end();
  //
  //   next();
  // });
});
