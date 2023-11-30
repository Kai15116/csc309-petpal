// Reference Lecture example: URL parser.
export function to_url_params(object) {
    var result = [];
    for (const key in object) {
        if (Array.isArray(object[key])) {
            for (const value of object[key]) {      
                result.push(`${key}[]=${value}`);
            }
        }
        else {
            let value = object[key];
            if (value !== "") {
            result.push(`${key}=${value}`);
            }
            // }
        }
    }
    return result.join('&');
}
