// Core/NPM Modules
const esprima = require("esprima");
//const faker = require("faker");
const fs = require('fs');
//const Random = require('random-js');
const _ = require('lodash');
//const randexp = require('randexp');



// Set options
//faker.locale = "en";
const options = { tokens: true, tolerant: true, loc: true, range: true };



// Create random generator engine
//const engine = Random.engines.mt19937().autoSeed();


/**
 * Constraint class. Represents constraints on function call parameters.
 *
 * @property {String}       type      
 * @property {String}       api
 * @property {String}       funcName   Name of the function being constrained.
 * @property {String}       paramName
 */
class Constraint {
    constructor(properties) {
        this.type = properties.type;
        this.api = properties.api;
        this.funcName = properties.funcName;
        this.paramName = properties.paramName;
    }
}


/**
 * Generate function parameter constraints for an input file
 * and save them to the global functionConstraints object.
 *
 * @param   {String} filePath Path of the file to generate tests for.
 * @returns {Object}          Function constraints object.
 */
function constraints(filePath) {
    //console.log("----------------------------------------------------")
    // Initialize function constraints directory
    //let functionConstraints = {};

    // Read input file and parse it with esprima.
    let buf = fs.readFileSync(filePath, "utf8");
    let result = esprima.parse(buf, options);
    let constraints = [];
    // Start traversing the root node
    traverse(result, function (node) {

        // If some node is a function declaration, parse it for potential constraints.
        if (node.type === 'ExpressionStatement') {
            // Traverse function node.
            traverse(node, function (child) {
                //                console.log(child);
                // Handle equivalence expression
                if (_.get(child, 'type') === 'CallExpression' && _.get(child, 'callee.property.name') === 'get') {
                    var api = _.get(child, 'arguments[0].value')
                    //                    console.log(api);
                    var paramNameVar, apiVar;
                    if (api.indexOf(":") === -1) {
                        paramNameVar = null;
                        apiVar = api;
                    }
                    else {
                        paramNameVar = api.substring(api.indexOf(":") + 1, api.length);
                        apiVar = api.substring(0, api.indexOf(":") - 1);
                    }

                    constraints.push(new Constraint({
                        type: 'get',
                        api: apiVar,
                        funcName: `${_.get(child, 'arguments[1].object.name')}` + '.' + `${_.get(child, 'arguments[1].property.name')}`,
                        paramName: paramNameVar
                    }));
                }
                else if (_.get(child, 'type') === 'CallExpression' && _.get(child, 'callee.property.name') === 'post') {
                    var api = _.get(child, 'arguments[0].value')
                    //                    console.log(api);
                    var paramNameVar = null;
                    // if (api.indexOf(":") === -1) {
                    //     paramNameVar = null;
                    // }
                    // else {
                    //     paramNameVar = api.substring(api.indexOf(":") + 1, api.length);
                    // }

                    constraints.push(new Constraint({
                        type: 'post',
                        api: api,
                        funcName: `${_.get(child, 'arguments[1].object.name')}` + '.' + `${_.get(child, 'arguments[1].property.name')}`,
                        paramName: paramNameVar
                    }));
                }

            });
        }
    });
    //    console.log(constraints);
    //console.log("----------------------------------------------------")

    return constraints;
}

/**
 * Traverse an object tree, calling the visitor at each
 * visited node.
 *
 * @param {Object}   object  Esprima node object.
 * @param {Function} visitor Visitor called at each node.
 */
function traverse(object, visitor) {

    // Call the visitor on the object
    visitor(object);

    // Traverse all children of object
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            let child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}


/**
 * Return the name of a function node.
 */
function functionName(node) {
    return node.id ? node.id.name : '';
}


/**
 * Generates an integer value based on some constraint.
 *
 * @param   {Number}  constraintValue Constraint integer.
 * @param   {Boolean} greaterThan     Whether or not the concrete integer is greater than the constraint.
 * @returns {Number}                  Integer satisfying constraints.
 */
function createConcreteIntegerValue(constraintValue, greaterThan) {
    if (greaterThan) return Random.integer(constraintValue + 1, constraintValue + 10)(engine);
    else return Random.integer(constraintValue - 10, constraintValue - 1)(engine);
}


// Export
module.exports = constraints;