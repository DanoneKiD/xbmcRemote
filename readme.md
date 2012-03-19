XBMC Remote
====================
Goal os this project is to produce a worthy configurable remote control for XBMC.  
I am also using this as a learning project to explore some of the latest mobile and javascript frameworks.

## Current Application Stack ##
* JQuery Mobile - mobile framework
* JQuery - js framework
* Handlebars.js - template framework
* Require.js - AMD loader
* Backbone.js - MV* framework
* Crossroads.js - Routing framework
* XBMC Pre Eden JASON interface 


## Installation ##
``` bash
cd xbmcRemote
git clone https://github.com/sheebz/xbmcRemote.git .
rm -rf .git
```

## Running Project ##
* Due to same origin policy, need to run web browser with security disabled.  
``` bash
open -a Google\ Chrome --args --disable-web-security

* Project runs under express server, need to install node and express.  
``` bash
cd xbmcRemote
node build server
