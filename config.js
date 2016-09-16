/*
 * config.js
 * - used to store all the sensitive global configurations
 * - and so would be NORMALLY BE EXCLUDED from github, or bitbucket etc
 *   however for demonstration purposes this particular file is being included here
 */


module.exports = {

    // used to create JWT signature
    // and then verify JWT validity
    'secret': 'N3xCh@ng3',

    // URI of the mongodb document
    'database': 'mongodb://localhost/node-jwt'
};