package io.slingr.endpoints.surveygizmo;

import io.slingr.endpoints.HttpEndpoint;
import io.slingr.endpoints.exceptions.EndpointException;
import io.slingr.endpoints.framework.annotations.EndpointFunction;
import io.slingr.endpoints.framework.annotations.EndpointProperty;
import io.slingr.endpoints.framework.annotations.EndpointWebService;
import io.slingr.endpoints.framework.annotations.SlingrEndpoint;
import io.slingr.endpoints.services.HttpService;
import io.slingr.endpoints.services.rest.RestMethod;
import io.slingr.endpoints.utils.Json;
import io.slingr.endpoints.ws.exchange.FunctionRequest;
import io.slingr.endpoints.ws.exchange.WebServiceRequest;
import io.slingr.endpoints.ws.exchange.WebServiceResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * <p>Stripe endpoint
 * <p>
 * API Reference: https://apihelp.surveygizmo.com/help
 *
 * <p>Created by dgaviola on 07/19/20.
 */
@SlingrEndpoint(name = "surveygizmo", functionPrefix = "_")
public class SurveyGizmoEndpoint extends HttpEndpoint {

    private static final Logger logger = LoggerFactory.getLogger(SurveyGizmoEndpoint.class);
    private static String US_API_URL = "https://restapi.surveygizmo.com/v5";
    private static String CA_API_URL = "https://restapica.surveygizmo.com/v5";
    private static String EU_API_URL = "https://restapi.surveygizmo.eu/v5";

    @EndpointProperty
    private String apiToken;

    @EndpointProperty
    private String apiTokenSecret;

    @EndpointProperty
    private String location;

    public SurveyGizmoEndpoint() {
    }

    @Override
    public String getApiUri() {
      switch (location) {
        case "us":
          return US_API_URL;
        case "ca":
          return CA_API_URL;
        case "eu":
          return EU_API_URL;
      }
      throw new RuntimeException("Invalid location");
    }

    @EndpointWebService
    public WebServiceResponse webhooks(WebServiceRequest request) {
        final Json json = HttpService.defaultWebhookConverter(request);
        if (request.getMethod().equals(RestMethod.POST)) {
            if (request.getBody() != null) {
                json.set("body", request.getBody());
            }
            // send the webhook event
            events().send(HttpService.WEBHOOK_EVENT, json);
        }
        return HttpService.defaultWebhookResponse();
    }

    @EndpointFunction(name = "_get")
    public Json get(FunctionRequest request) {
        logger.info(String.format("GET [%s]", request.getJsonParams().string("path")));
        setRequestConfig(request, false);
        try {
            return defaultGetRequest(request);
        } catch (EndpointException e) {
            throw e;
        }
    }

    @EndpointFunction(name = "_put")
    public Json put(FunctionRequest request) {
        logger.info(String.format("PUT [%s]", request.getJsonParams().string("path")));
        setRequestConfig(request, true);
        try {
            return defaultPutRequest(request);
        } catch (EndpointException e) {
            throw e;
        }
    }

    @EndpointFunction(name = "_patch")
    public Json patch(FunctionRequest request) {
        logger.info(String.format("PATCH [%s]", request.getJsonParams().string("path")));
        setRequestConfig(request, true);
        try {
            return defaultPatchRequest(request);
        } catch (EndpointException e) {
            throw e;
        }
    }

    @EndpointFunction(name = "_post")
    public Json post(FunctionRequest request) {
        logger.info(String.format("POST [%s]", request.getJsonParams().string("path")));
        setRequestConfig(request, true);
        try {
            return defaultPostRequest(request);
        } catch (EndpointException e) {
            throw e;
        }
    }

    @EndpointFunction(name = "_delete")
    public Json delete(FunctionRequest request) {
        logger.info(String.format("DELETE [%s]", request.getJsonParams().string("path")));
        setRequestConfig(request, false);
        try {
            return defaultDeleteRequest(request);
        } catch (EndpointException e) {
            throw e;
        }
    }

    private void setRequestConfig(FunctionRequest request, boolean formEncoded) {
        Json body = request.getJsonParams();
        Json params = body.json("params");
        if (params == null) {
            params = Json.map();
        }
        params.set("api_token", apiToken);
        params.set("api_token_secret", apiTokenSecret);
        Json headers = body.json("headers");
        if (headers == null) {
            headers = Json.map();
        }
        if (formEncoded) {
            headers.set("Content-Type", "application/x-www-form-urlencoded");
        } else {
            headers.set("Content-Type", "application/json");
        }
        body.set("headers", headers);
        body.set("params", params);
    }

}
