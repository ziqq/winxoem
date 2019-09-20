/**
 * App.js
 *
 * @author Anton Ustinoff <a.a.ustinoff@gmail.com>
 */

import Site from './Site';

window.site = new Site();

$(function() {
    window.site.init();

    if (NODE_ENV == 'development') {
        console.log('--- Site Init');
    }
});
