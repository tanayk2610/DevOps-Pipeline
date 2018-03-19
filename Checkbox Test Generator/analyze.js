var fs = require('fs'),
    esprima = require('esprima');
const _ = require('lodash');
const options = { tokens: true, tolerant: true, loc: true, range: true };

/**
 * Constraint class. Represents constraints on function call parameters.
 *
 * @property {String}                                                          ident      Identity of the parameter mapped to the constraint.
 * @property {String}                                                          expression Full expression string for a constraint.
 * @property {String}                                                          operator   Operator used in constraint.
 * @property {String|Number}                                                   value      Main constraint value.
 * @property {String|Number}                                                   altvalue   Constraint alternative value.
 * @property {String}                                                          funcName   Name of the function being constrained.
 * @property {'fileWithContent'|'fileExists'|'integer'|'string'|'phoneNumber'} kind       Type of the constraint.
 */
class Constraint {
    constructor(properties) {
        this.ident = properties.ident;
        this.expression = properties.expression;
        this.operator = properties.operator;
        this.value = properties.value;
        this.altvalue = properties.altvalue;
        this.funcName = properties.funcName;
        this.kind = properties.kind;
    }
}

// function traverse(node, func) {
//     func(node);
//     for (var key in node) { 
//         if (node.hasOwnProperty(key)) { 
//             var child = node[key];
//             if (typeof child === 'object' && child !== null) { 

//                 if (Array.isArray(child)) {
//                     child.forEach(function (node) { 
//                         traverse(node, func);
//                     });
//                 } else {
//                     traverse(child, func); 
//                 }
//             }
//         }
//     }
// }

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


function analyze(filename) {
    var code = fs.readFileSync(filename, 'utf8');
    var ast = esprima.parse(code, options);
    let functionConstraints = {};
    traverse(ast, function (node) {

        // If some node is a function declaration, parse it for potential constraints.
        if (node.type === 'AssignmentExpression' && node.right.type === 'FunctionExpression') {
            //  console.log(node.left.property.name);
            var funcName = node.left.property.name;
            let params = node.right.params.map(function (p) { return p.name });

            // Initialize function constraints
            functionConstraints[funcName] = {
                constraints: _.zipObject(params, _.map(params, () => [])),
                params: params
            };
//            console.log(functionConstraints);
            traverse(node, function (child) {
                if (_.get(child, 'type') === 'VariableDeclaration') {
                    var visited = false;

                    traverse(child, function (grandChild) {
                        if (!visited) {
                            if (_.get(grandChild, 'type') === 'MemberExpression') {
                                visited = true;
                                let expression = code.substring(grandChild.range[0], grandChild.range[1]);
                                let p = expression.substring(0, expression.indexOf('.'));
                                let pa = expression.substring(expression.indexOf('.'), expression.length);
                                if (_.includes(params, p)) {
                                    var temp = {};
                                    _.set(temp, expression, 'value');
                                    // console.log(funcName, expression);
                                    // console.log(_.get(temp, p));

                                    let constraints = functionConstraints[funcName].constraints[p];
                                    // console.log("Before: " + constraints);
                                    constraints.push(new Constraint({
                                        ident: p,
                                        value: JSON.stringify(_.get(temp, p)),
                                        funcName: funcName,
                                        kind: "string",
                                        operator: child.operator,
                                        expression: expression
                                    }));
                                    // console.log("After: " + constraints);
                                }
                            }
                        }
                    });

                }
            });
        }
    });
    return functionConstraints;
}
// 2
// if (process.argv.length < 3) {
//     console.log('Usage: analyze.js file.js');
//     process.exit(1);
// }

// const execSync = require('child_process').execSync;
// var files = execSync("ls C:\\Users\\sayali\\gitFolder\\DevOpsWorkspace\\projectM2\\checkbox.io\\server-side\\site\\routes\\*.js");
// var javafiles = files.toString().trim().split("\n");
// javafiles.forEach(function(file){
//     console.log('Reading ' + file);
//     var code = fs.readFileSync(file,'utf8');
// });

// 3

/**
 * Return the name of a function node.
 */
function functionName(node) {
    return node.id ? node.id.name : '';
}

// Export
module.exports = analyze;