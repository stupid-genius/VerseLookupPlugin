Bible Verse Tooltips
==========
A Chrome plugin that scans the current page for Bible verse references and creates a tooltip that contains the verse text.

Omnibox support:
--------------
**keyword**: bible

Type "bible" into the Omnibox and press `TAB`, then enter a verse and press `ENTER`.

Prerequisites:
--------------

You'll need [Node](http://nodejs.org/), [Grunt](http://gruntjs.com/), & [Bower](http://bower.io/).

Build:
-------------

 1. Clone the repo or download the source
 2. From repo root, run `npm install`, then `bower install`
 3. From ./test, run `bower install`
 4. Run `grunt`

Known issues:
-------------

 1. The install for **imagemin** is broken at the moment.  In addition to the above build instructions, you'll need to go to [repo root]/node_modules/grunt-contrib-imagemin/node_modules/imagemin/ and run `npm install` again.
 2. The plugin does not work well on pages that dynamically add content (i.e. Facebook).  I spent some time working on adding delegate event handlers, but some sites use highly complex, proprietary loading schemes (e.g. Facebook) that don't fire the handlers.  I'll create an issue and leave it for the time being.

Installation:
-------------

 1. Build the plugin as per the instructions above
 2. In Chrome, open chrome://extensions/
 3. Go to [repo root]/package/ and drag the zip file there to the browser and drop it where it says "Drop to install"
