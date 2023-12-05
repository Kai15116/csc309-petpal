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

export function formatTimeGap(created_at) {
    var secAgo = ((new Date).getTime() - created_at.getTime()) / 1000;
    if (secAgo < 60) {
      return 'Just now';
    }
    else if (secAgo < 60 * 60) {
      return parseInt(Math.ceil(secAgo / 60)) + 'm ago';
    }
    else if (secAgo < 60 * 60 * 24) {
      return parseInt(Math.ceil(secAgo / 3600)) + 'h ago';
    }
    else {
      return new Date(Date.parse(created_at)).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
    }
  }