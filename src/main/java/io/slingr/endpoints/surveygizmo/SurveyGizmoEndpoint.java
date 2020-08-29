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

import java.util.concurrent.Semaphore;


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
    private static int MAX_CONCURRENT_CALLS = 1;
    private static int WAIT_WHEN_RATE_LIMIT = 5000;
    private static int MAX_RETRIES = 6;

    @EndpointProperty
    private String apiToken;

    @EndpointProperty
    private String apiTokenSecret;

    @EndpointProperty
    private String location;

    // surveygizmo is very picky when calling the api, and if you make calls concurrently, it will fail
    // for this reason we have a semaphore to reduce concurrency
    private final Semaphore semaphore = new Semaphore(MAX_CONCURRENT_CALLS, true);

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
    public Json get(FunctionRequest request) throws InterruptedException {
        semaphore.acquire();
        try {
            logger.info(String.format("GET [%s]", request.getJsonParams().string("path")));
            setRequestConfig(request, false);
            int retries = 0;
            while (true) {
                try {
                    return defaultGetRequest(request);
                } catch (EndpointException e) {
                    if (e.getReturnCode() == 429) {
                        if (retries >= MAX_RETRIES) {
                            throw e;
                        } else {
                            // wait a few seconds and retry
                            Thread.sleep(WAIT_WHEN_RATE_LIMIT);
                            retries++;
                        }
                    } else {
                        throw e;
                    }
                }
            }
        } finally {
            semaphore.release();
        }
    }

    @EndpointFunction(name = "_put")
    public Json put(FunctionRequest request) throws InterruptedException {
        semaphore.acquire();
        try {
            logger.info(String.format("PUT [%s]", request.getJsonParams().string("path")));
            setRequestConfig(request, true);
            int retries = 0;
            while (true) {
                try {
                    return defaultPutRequest(request);
                } catch (EndpointException e) {
                    if (e.getReturnCode() == 429) {
                        if (retries >= MAX_RETRIES) {
                            throw e;
                        } else {
                            // wait a few seconds and retry
                            Thread.sleep(WAIT_WHEN_RATE_LIMIT);
                            retries++;
                        }
                    } else {
                        throw e;
                    }
                }
            }
        } finally {
            semaphore.release();
        }
    }

    @EndpointFunction(name = "_patch")
    public Json patch(FunctionRequest request) throws InterruptedException {
        semaphore.acquire();
        try {
            logger.info(String.format("PATCH [%s]", request.getJsonParams().string("path")));
            setRequestConfig(request, true);
            int retries = 0;
            while (true) {
                try {
                    return defaultPatchRequest(request);
                } catch (EndpointException e) {
                    if (e.getReturnCode() == 429) {
                        if (retries >= MAX_RETRIES) {
                            throw e;
                        } else {
                            // wait a few seconds and retry
                            Thread.sleep(WAIT_WHEN_RATE_LIMIT);
                            retries++;
                        }
                    } else {
                        throw e;
                    }
                }
            }
        } finally {
            semaphore.release();
        }
    }

    @EndpointFunction(name = "_post")
    public Json post(FunctionRequest request) throws InterruptedException {
        semaphore.acquire();
        try {
            logger.info(String.format("POST [%s]", request.getJsonParams().string("path")));
            setRequestConfig(request, true);
            int retries = 0;
            while (true) {
                try {
                    return defaultPostRequest(request);
                } catch (EndpointException e) {
                    if (e.getReturnCode() == 429) {
                        if (retries >= MAX_RETRIES) {
                            throw e;
                        } else {
                            // wait a few seconds and retry
                            Thread.sleep(WAIT_WHEN_RATE_LIMIT);
                            retries++;
                        }
                    } else {
                        throw e;
                    }
                }
            }
        } finally {
            semaphore.release();
        }
    }

    @EndpointFunction(name = "_delete")
    public Json delete(FunctionRequest request) throws InterruptedException {
        semaphore.acquire();
        try {
            logger.info(String.format("DELETE [%s]", request.getJsonParams().string("path")));
            setRequestConfig(request, false);
            int retries = 0;
            while (true) {
                try {
                    return defaultDeleteRequest(request);
                } catch (EndpointException e) {
                    if (e.getReturnCode() == 429) {
                        if (retries >= MAX_RETRIES) {
                            throw e;
                        } else {
                            // wait a few seconds and retry
                            Thread.sleep(WAIT_WHEN_RATE_LIMIT);
                            retries++;
                        }
                    } else {
                        throw e;
                    }
                }
            }
        } finally {
            semaphore.release();
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
