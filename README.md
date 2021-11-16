---
title: SurveyGizmo endpoint
keywords: 
last_updated: July 28, 2020
tags: []
summary: "Detailed description of the API of the SurveyGizmo endpoint."
---

## Overview

SurveyGizmo is a web-based software company giving researchers, and small and enterprise companies powerful tools to create online surveys, questionnaires and forms – allowing capture and analysis of virtually any type of data essential for business.

This endpoint has the following features:

- Interact with SurveyGizmo API
- Shortcuts to access the REST API
- Support for webhooks

In most cases you will be using the provided shortcuts to access the API. For example, you could use the REST API
directly by doing an HTTP request like this:

```js
var res = app.endpoints.surveygizmo.get('/survey/123456');
```

However, you probably want to use the shortcuts:

```js
var res = app.endpoints.surveygizmo.survey.get('123456');
```

These shortcuts are based on the [SurveyGizmo v5 REST API](https://apihelp.surveygizmo.com/help/version-5).
You can see more information about that in the [shortcuts section](#shortcuts).

## Configuration

First you will need to set up an account in SurveyGizmo. Then, in order to be able to configure the endpoint you will
need to generate an API token. You can find more information about that [here](https://apihelp.surveygizmo.com/help/authentication).

### API Token

The API token generated in SurveyGizmo.

### API Token Secret

The API token secret generated in SurveyGizmo.

### Webhook URL

This is the URL you should configure for webhooks in SurveyGizmo dashboard (see [here](https://help.surveygizmo.com/help/account-webhooks)) 

## Javascript API

The Javascript API of the SurveyGizmo endpoint has two pieces:

- **HTTP request**: this allows making regular HTTP requests like `GET`, `POST` or `PUT` to the API.
- **Shortcuts**: these are helpers to make HTTP request to the API in a more convenient way.

### HTTP requests

You can make `GET`, `POST`, `PUT`, and `DELETE` request to the 
[SurveyGizmo v5 API](https://apihelp.surveygizmo.com/help/version-5) like this:

```js
var res = app.endpoints.surveygizmo.survey.get('/survey/123456');

var res = app.endpoints.surveygizmo.survey.put({
    path: '/survey/123456/surveycampaign',
    body: {
      type: 'email',
      name: 'Test Campaign',
      secure: true
    }
});
```

Please take a look at the documentation of the [HTTP endpoint]({{site.baseurl}}/endpoints_http.html#javascript-api)
for more information.

### Shortcuts

Instead of having to use the generic HTTP methods, you can make use of the shortcuts provided in the endpoint. These
shortcuts follow these rules:

- **Path sections get converted to namespaces**: for example if the method is GET `~/survey/123456` is converted to 
    `app.endpoints.surveygizmo.survey.get('123456')`. 
- **HTTP method is appended at the end of the method**: for example if the method is `GET`, you will see a method with 
  the suffix `.get(...)`.  
  This is the mapping of names:
  - `GET`: `get`
  - `POST`: `create`
  - `PUT`: `update`
  - `PATCH`: `update`
  - `DELETE`: `delete`
- **Path variables become method parameters**: if the method has variables in the path, they will become parameters for 
  the method. For example `GET ~/survey/123456/surveycampaign/654321` will become 
  `app.endpoints.surveygizmo.survey.surveycampaign.get('123456', '654321')`.
- **Additional parameters or body are sent in the last param as JSON**: if the method accepts more parameters or it 
  allows to send a body, that will be sent in the last parameter. For example the method `PUT ~/survey/123456/surveycampaign`, 
  so it will become `app.endpoints.surveygizmo.surveycampaign.put('123456', {...})`.
- **Parameters are send as object**: in order to send parameters in URL you send as object parameter. For example the 
  method `~/survey?page=2` so it will become `app.endpoints.surveygizmo.survey.get('123456', {page: 2});`
  
Following is a list of available helpers:

    endpoint.account.get()
    endpoint.accountteams.get()
    endpoint.accountteams.put()
    endpoint.accountteams.post()
    endpoint.accountteams.delete()
    endpoint.accountuser.get()
    endpoint.accountuser.put()
    endpoint.accountuser.post()
    endpoint.accountuser.delete()
    endpoint.domain.get()
    endpoint.domain.put()
    endpoint.domain.post()
    endpoint.domain.delete()
    endpoint.sso.get()
    endpoint.sso.put()
    endpoint.sso.post()
    endpoint.sso.delete()
    endpoint.surveytheme.get()
    endpoint.surveytheme.put()
    endpoint.surveytheme.post()
    endpoint.surveytheme.delete()
    endpoint.contactlist.get()
    endpoint.contactlist.put()
    endpoint.contactlist.post()
    endpoint.contactlist.delete()
    endpoint.contactlist.contactlistcontact.get()
    endpoint.contactlist.contactlistcontact.put()
    endpoint.contactlist.contactlistcontact.post()
    endpoint.contactlist.contactlistcontact.delete()
    endpoint.contactcustomfield.get()
    endpoint.contactcustomfield.put()
    endpoint.contactcustomfield.post()
    endpoint.contactcustomfield.delete()
    endpoint.survey.get()
    endpoint.survey.put()
    endpoint.survey.post()
    endpoint.survey.delete()
    endpoint.survey.surveypage.get()
    endpoint.survey.surveypage.put()
    endpoint.survey.surveypage.post()
    endpoint.survey.surveypage.delete()
    endpoint.survey.surveyquestion.get()
    endpoint.survey.surveyquestion.put()
    endpoint.survey.surveyquestion.post()
    endpoint.survey.surveyquestion.delete()
    endpoint.survey.surveyquestion.surveyoption.get()
    endpoint.survey.surveyquestion.surveyoption.put()
    endpoint.survey.surveyquestion.surveyoption.post()
    endpoint.survey.surveyquestion.surveyoption.delete()
    endpoint.survey.surveycampaign.get()
    endpoint.survey.surveycampaign.put()
    endpoint.survey.surveycampaign.post()
    endpoint.survey.surveycampaign.delete()
    endpoint.survey.surveycampaign.surveycontact.get()
    endpoint.survey.surveycampaign.surveycontact.put()
    endpoint.survey.surveycampaign.surveycontact.post()
    endpoint.survey.surveycampaign.surveycontact.delete()
    endpoint.survey.surveycampaign.emailmessage.get()
    endpoint.survey.surveycampaign.emailmessage.put()
    endpoint.survey.surveycampaign.emailmessage.post()
    endpoint.survey.surveycampaign.emailmessage.delete()
    endpoint.survey.surveyresponse.get()
    endpoint.survey.surveyresponse.put()
    endpoint.survey.surveyresponse.post()
    endpoint.survey.surveyresponse.delete()
    endpoint.survey.surveystatistic.get()
    endpoint.survey.surveystatistic.put()
    endpoint.survey.surveystatistic.post()
    endpoint.survey.surveystatistic.delete()
    endpoint.survey.surveyreport.get()
    endpoint.survey.surveyreport.put()
    endpoint.survey.surveyreport.post()
    endpoint.survey.surveyreport.delete()
    endpoint.survey.quotas.get()
    endpoint.survey.quotas.put()
    endpoint.survey.quotas.post()
    endpoint.survey.quotas.delete()

## Events

### Webhook

SurveyGizmo's webhooks allow your application to receive push notifications for surveys and responses.

Please refer to the [webhooks documentation](https://help.surveygizmo.com/help/account-webhooks) for more information on how to configure them.

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
