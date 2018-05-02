export const UNAUTHORIZED = {
    "version": "v1",
    "success": false,
    "data": null,
    "error": {
        "reason_code": "UNAUTHORIZED",
        "messages": [
            "Bad login or password"
        ]
    }
};

export const RESOURCE_NOT_FOUND = {
    "version": "v1",
    "success": false,
    "data": null,
    "error": {
        "reason_code": "RESOURCE_NOT_FOUND",
        "messages": []
    }
}

export const MALFORMED_REQUEST_BODY = {
    "version": "v1",
    "success": false,
    "data": null,
    "error": {
        "reason_code": "MALFORMED_REQUEST_BODY",
        "messages": [
            "JSON in request body is invalid"
        ]
    }
}

export const ROUTE_NOT_FOUND_OR_METHOD_NOT_ALLOWED = {
    "version": "v1",
    "success": false,
    "data": null,
    "error": {
        "reason_code": "ROUTE_NOT_FOUND_OR_METHOD_NOT_ALLOWED",
        "messages": [
            "Action does not exist. Invalid URI \"shop_api/v1/categories\" or HTTP method"
        ]
    }
}
