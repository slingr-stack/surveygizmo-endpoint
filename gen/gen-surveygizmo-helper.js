var fs = require('fs');

var FILE_NAME = "surveygizmo-helpers.js";
var CODE = '';
var NAMESPACE = "endpoint.";

var urlsData = {};

var API_DESCRIPTOR = [
    {method: 'GET', URL: 'account/'},
    {method: 'GET', URL: 'accountteams/'},
    {method: 'GET', URL: 'accountteams/:id'},
    {method: 'PUT', URL: 'accountteams/'},
    {method: 'POST', URL: 'accountteams/:id'},
    {method: 'DELETE', URL: 'accountteams/:id'},
    {method: 'GET', URL: 'accountuser/'},
    {method: 'GET', URL: 'accountuser/:id'},
    {method: 'PUT', URL: 'accountuser/'},
    {method: 'POST', URL: 'accountuser/:id'},
    {method: 'DELETE', URL: 'accountuser/:id'},
    {method: 'GET', URL: 'domain/'},
    {method: 'GET', URL: 'domain/:id'},
    {method: 'PUT', URL: 'domain/'},
    {method: 'POST', URL: 'domain/:id'},
    {method: 'DELETE', URL: 'domain/:id'},
    {method: 'GET', URL: 'sso/'},
    {method: 'GET', URL: 'sso/:id'},
    {method: 'PUT', URL: 'sso/'},
    {method: 'POST', URL: 'sso/:id'},
    {method: 'DELETE', URL: 'sso/:id'},
    {method: 'GET', URL: 'surveytheme/'},
    {method: 'GET', URL: 'surveytheme/:id'},
    {method: 'PUT', URL: 'surveytheme/'},
    {method: 'POST', URL: 'surveytheme/:id'},
    {method: 'DELETE', URL: 'surveytheme/:id'},
    {method: 'GET', URL: 'contactlist/'},
    {method: 'GET', URL: 'contactlist/:id'},
    {method: 'PUT', URL: 'contactlist/'},
    {method: 'POST', URL: 'contactlist/:id'},
    {method: 'DELETE', URL: 'contactlist/:id'},
    {method: 'GET', URL: 'contactlist/:contactListId/contactlistcontact/'},
    {method: 'GET', URL: 'contactlist/:contactListId/contactlistcontact/:id'},
    {method: 'PUT', URL: 'contactlist/:contactListId/contactlistcontact/'},
    {method: 'POST', URL: 'contactlist/:contactListId/contactlistcontact/:id'},
    {method: 'DELETE', URL: 'contactlist/:contactListId/contactlistcontact/:id'},
    {method: 'GET', URL: 'contactcustomfield/'},
    {method: 'GET', URL: 'contactcustomfield/:id'},
    {method: 'PUT', URL: 'contactcustomfield/'},
    {method: 'POST', URL: 'contactcustomfield/:id'},
    {method: 'DELETE', URL: 'contactcustomfield/:id'},
    {method: 'GET', URL: 'survey/'},
    {method: 'GET', URL: 'survey/:id'},
    {method: 'PUT', URL: 'survey/'},
    {method: 'POST', URL: 'survey/:id'},
    {method: 'DELETE', URL: 'survey/:id'},
    {method: 'GET', URL: 'survey/:surveyId/surveypage/'},
    {method: 'GET', URL: 'survey/:surveyId/surveypage/:id'},
    {method: 'PUT', URL: 'survey/:surveyId/surveypage/'},
    {method: 'POST', URL: 'survey/:surveyId/surveypage/:id'},
    {method: 'DELETE', URL: 'survey/:surveyId/surveypage/:id'},
    {method: 'GET', URL: 'survey/:surveyId/surveyquestion/'},
    {method: 'GET', URL: 'survey/:surveyId/surveyquestion/:id'},
    {method: 'PUT', URL: 'survey/:surveyId/surveyquestion/'},
    {method: 'POST', URL: 'survey/:surveyId/surveyquestion/:id'},
    {method: 'DELETE', URL: 'survey/:surveyId/surveyquestion/:id'},
    {method: 'GET', URL: 'survey/:surveyOption/surveyquestion/:surveyQuestionId/surveyoption/'},
    {method: 'GET', URL: 'survey/:surveyOption/surveyquestion/:surveyQuestionId/surveyoption/:id'},
    {method: 'PUT', URL: 'survey/:surveyOption/surveyquestion/:surveyQuestionId/surveyoption/'},
    {method: 'POST', URL: 'survey/:surveyOption/surveyquestion/:surveyQuestionId/surveyoption/:id'},
    {method: 'DELETE', URL: 'survey/:surveyOption/surveyquestion/:surveyQuestionId/surveyoption/:id'},
    {method: 'GET', URL: 'survey/:surveyId/surveycampaign/'},
    {method: 'GET', URL: 'survey/:surveyId/surveycampaign/:id'},
    {method: 'PUT', URL: 'survey/:surveyId/surveycampaign/'},
    {method: 'POST', URL: 'survey/:surveyId/surveycampaign/:id'},
    {method: 'DELETE', URL: 'survey/:surveyId/surveycampaign/:id'},
    {method: 'GET', URL: 'survey/:surveyId/surveycampaign/:surveyCampaignId/surveycontact/'},
    {method: 'GET', URL: 'survey/:surveyId/surveycampaign/:surveyCampaignId/surveycontact/:id'},
    {method: 'PUT', URL: 'survey/:surveyId/surveycampaign/:surveyCampaignId/surveycontact/'},
    {method: 'POST', URL: 'survey/:surveyId/surveycampaign/:surveyCampaignId/surveycontact/:id'},
    {method: 'DELETE', URL: 'survey/:surveyId/surveycampaign/:surveyCampaignId/surveycontact/:id'},
    {method: 'GET', URL: 'survey/:surveyId/surveycampaign/:surveyCampaignId/emailmessage/'},
    {method: 'GET', URL: 'survey/:surveyId/surveycampaign/:surveyCampaignId/emailmessage/:id'},
    {method: 'PUT', URL: 'survey/:surveyId/surveycampaign/:surveyCampaignId/emailmessage/'},
    {method: 'POST', URL: 'survey/:surveyId/surveycampaign/:surveyCampaignId/emailmessage/:id'},
    {method: 'DELETE', URL: 'survey/:surveyId/surveycampaign/:surveyCampaignId/emailmessage/:id'},
    {method: 'GET', URL: 'survey/:surveyId/surveyresponse/'},
    {method: 'GET', URL: 'survey/:surveyId/surveyresponse/:id'},
    {method: 'PUT', URL: 'survey/:surveyId/surveyresponse/'},
    {method: 'POST', URL: 'survey/:surveyId/surveyresponse/:id'},
    {method: 'DELETE', URL: 'survey/:surveyId/surveyresponse/:id'},
    {method: 'GET', URL: 'survey/:surveyId/surveystatistic/'},
    {method: 'GET', URL: 'survey/:surveyId/surveystatistic/:id'},
    {method: 'PUT', URL: 'survey/:surveyId/surveystatistic/'},
    {method: 'POST', URL: 'survey/:surveyId/surveystatistic/:id'},
    {method: 'DELETE', URL: 'survey/:surveyId/surveystatistic/:id'},
    {method: 'GET', URL: 'survey/:surveyId/surveyreport/'},
    {method: 'GET', URL: 'survey/:surveyId/surveyreport/:id'},
    {method: 'PUT', URL: 'survey/:surveyId/surveyreport/'},
    {method: 'POST', URL: 'survey/:surveyId/surveyreport/:id'},
    {method: 'DELETE', URL: 'survey/:surveyId/surveyreport/:id'},
    {method: 'GET', URL: 'survey/:surveyId/quotas/'},
    {method: 'GET', URL: 'survey/:surveyId/quotas/:id'},
    {method: 'PUT', URL: 'survey/:surveyId/quotas/'},
    {method: 'POST', URL: 'survey/:surveyId/quotas/:id'},
    {method: 'DELETE', URL: 'survey/:surveyId/quotas/:id'}
];

var convertUrls = function (url) {

    var convertedUrl = url;

    convertedUrl = convertedUrl.replace(/{/gi, ':');
    convertedUrl = convertedUrl.replace(/}/gi, '');

    return convertedUrl;
};

var camelCase = function (input) {
    return input.toLowerCase().replace(/_(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });
};

var analyzeParams = function (args) {
    var paramsSize = 0;
    var params = [];
    var argumentsObj = null;
    for (var i = 0; i < args.length; i++) {
        if (typeof args[i] != 'object') {
            paramsSize++;
            params.push(args[i]);
        } else {
            argumentsObj = args[i];
        }

    }
    return {
        paramsSize: paramsSize,
        argumentsObj: argumentsObj,
        params: params
    };
};

var getUrl = function (url, params, args, argsToPath) {

    if (!url) {
        return null;
    }

    if (params.length > 0) {
        var i = 0;
        url = url.replace(/:(\w+)/g, function () {
            return params[i++];
        });
    }

    if (args && argsToPath) {
        var tmp = Object.keys(args).map(function (k) {
            return encodeURIComponent(k) + '=' + args[k];
        }).join('&');

        if (url.split("\?").length > 1) {
            url += '&' + tmp;
        } else {
            url += '?' + tmp;
        }
    }

    return url;
};

var makeEndpointsHelpers = function () {

        for (var i in API_DESCRIPTOR) {

            var objDes = API_DESCRIPTOR[i];

            var numVars = 0;
            var fnNames = [];
            var newPath = '';
            var url = convertUrls(objDes.URL);

            var tmpUrl = url.split("\?")[0];
            var urlParts = tmpUrl.split('/');
            for (var p in urlParts) {
                if (urlParts[p] != "" && urlParts[p] != "v1") {
                    if (urlParts[p].substr(0, 1) == ':') {
                        numVars++;
                        newPath += '/%s'
                    } else {
                        fnNames.push(urlParts[p]);
                        newPath += '/' + urlParts[p];
                    }
                }
            }

            var functionName = camelCase(fnNames.join('.'));
            functionName += "." + objDes.method.toLowerCase();
            if (!urlsData[functionName]) {
                urlsData[functionName] = {};
            }

            urlsData[functionName][numVars] = url;

        }

    var tmpObj = {};
    var tmpCode = '';
    var path = '';

    for (var i in urlsData) {

        path = '';
        var urlPart = i.split("\.");

        for (var j = 0; j < urlPart.length; j++) {

            path += (j == 0) ? urlPart[0] : '.' + urlPart[j];

            if (!tmpObj[path]) {
                tmpObj[path] = {};
                if (j < urlPart.length - 1) {
                    tmpCode += NAMESPACE + path + ' = {};\n';
                } else {

                    var method = urlPart[j];
                    var caller = method;
                    var transfromArguments = 'true';
                    if (method === 'get' || method === 'delete') {
                        caller += '(url)';
                        transfromArguments = 'true';
                    } else {
                        caller += '(url, params.argumentsObj)'
                        transfromArguments = 'false';
                    }

                    var fn = `function() {
\tvar obj = urlsData['${i}'];
\tvar params = analyzeParams(arguments);
\tvar url = getUrl(obj[params.paramsSize], params.params, params.argumentsObj, ${transfromArguments});
\treturn endpoint.${caller};
};`;

                    tmpCode += NAMESPACE + path + ' = ' + fn + '\n\n';
                }
            }
        }
    }

    CODE += tmpCode;

    var MESSAGE = '//////////////////////////////////////////////////////////////////////////\n';
    MESSAGE += '//                                                                      //\n';
    MESSAGE += '//    This file is generated with gen/gen-surveygizmo-helpers.js        //\n';
    MESSAGE += '//                                                                      //\n';
    MESSAGE += '//            ' + new Date() + '                   //\n';
    MESSAGE += '//                                                                      //\n';
    MESSAGE += '//////////////////////////////////////////////////////////////////////////\n';

    var HELPERS = 'var analyzeParams = ' + analyzeParams.toString() + ';\n\n';
    HELPERS += 'var getUrl = ' + getUrl.toString() + ';\n\n';
    CODE = MESSAGE + '\n\nvar urlsData = ' + JSON.stringify(urlsData, null, "\t") + ';\n\n' + HELPERS + '' + CODE;

};

makeEndpointsHelpers();

fs.writeFile("../scripts/" + FILE_NAME, CODE, function (err) {
    if (err) {
        return console.error(err);
    }

    console.info('Generator has run successfully!');
});
