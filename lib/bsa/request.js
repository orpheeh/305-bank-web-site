export const RequestMethod = {
    POST: "POST",
    GET: "GET",
    DELETE: "DELETE"
}

export async function request(url, method, body, header, query = "") {
    const response  = await fetch(url + query, {
        method,
        body: method != RequestMethod.GET ? JSON.stringify(body) : null,
        headers: header
    });

    return await response.json();
}