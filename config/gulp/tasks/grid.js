var config = require('../../config');
var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'scss' /* less || scss || sass || styl */,
    columns: 12 /* number of grid columns */,
    offset: '20px' /* gutter width px || % */,
    mobileFirst: false /* mobileFirst ? 'min-width' : 'max-width' */,
    container: {
        maxWidth: '1200px' /* max-width оn very large screen */,
        fields: '20px' /* side fields */,
    },
    breakPoints: {
        lg: {
            width: '1200px' /* -> @media (max-width: 1100px) */,
        },
        md: {
            width: '1024px',
            // fields: '15px' /* set fields only if you want to change container.fields */
        },
        sm: {
            width: '768px',
        },
        xs: {
            width: '480px',
        },
        i8: {
            width: '414px',
        },
        i7: {
            width: '375px',
        },
        i5: {
            width: '320px',
        },
        /*
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    },
};

smartgrid(config.src.libs, settings);
