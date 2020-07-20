endpoint.testing = function (url) {

    return endpoint.get(url);
};


/////////////////////////////////////
// Public API - Generic Functions
/////////////////////////////////////

endpoint.get = function (url, options) {
    var options = checkHttpOptions(url, options);
    return endpoint._get(options);
};

endpoint.post = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._post(options);
};

endpoint.patch = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._patch(options);
};

endpoint.put = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._put(options);
};

endpoint.delete = function (url) {
    var options = checkHttpOptions(url, {});
    return endpoint._delete(options);
};


/////////////////////////////
//  Private helpers
/////////////////////////////

var convertJsonToForm = function(obj, prefix, params) {
    var params = params || {};
    var addParam = function(params, key, value) {
        if (params[key]) {
            if (Array.isArray(params[key])) {
                params[key].push(value);
            } else {
                var array = [params[key]];
                array.push(value);
                params[key] = array;
            }
        } else {
            params[key] = value;
        }
    };
    var getPath = function(prefix, field, array) {
        var path;
        if (prefix) {
            path = prefix+'['+field+']';
        } else {
            path = field;
        }
        if (array) {
            path += '[]';
        }
        return path;
    };
    for (var key in obj) {
        if (Array.isArray(obj[key])) {
            obj[key].forEach(function(item) {
               if (typeof item == 'object') {
                   convertJsonToForm(item, getPath(prefix, key, true), params);
               } else {
                   addParam(params, getPath(prefix, key, true), item);
               }
            });
        } else if (typeof obj[key] == 'object') {
            convertJsonToForm(obj[key], getPath(prefix, key), params);
        } else {
            addParam(params, getPath(prefix, key), obj[key]);
        }
    }
    return params;
};

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
            if (options.body) {
                options.body = convertJsonToForm(options.body);
            }
        } else {
            if (!!options.path || !!options.params || !!options.body || !!options.headers) {
                // options contains the http package format
                options.path = url;
                if (options.body) {
                    options.body = convertJsonToForm(options.body);
                }
            } else {
                // create html package
                options = {
                    path: url,
                    body: convertJsonToForm(options)
                }
            }
        }
    }
    return options;
};

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);