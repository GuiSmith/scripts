export var time = {};
time.sec = 100;
time.min = 60 * time.sec;
time.hour = 60 * time.min;
time.day = 24 * time.hour;
time.year = 365 * time.day;
time.yesterday = time.day * (-1);

const feedback_element_time = time.sec * 3;

//Creates a cookie
export function set_cookie(name, value, miliseconds = time.min) {
    if (!name || !value) {
        console.log(`Could not create cookie because name or value is empty/null: name=${name}; value=${value}`);
        return false;
    } else {
        let now = new Date();
        let expires = (new Date(now.getTime() + miliseconds)).toUTCString();
        document.cookie = `${name}=${value};expires=${expires};path=/`;
        return true;
        //console.log(document.cookie);
    }
}

//Gets a specific cookie | Success return: object | Fail return: empty object OR false
export function get_cookie(cookie_name, return_type = 'object') {
    let decoded_URI_component = document.cookie ? decodeURIComponent(document.cookie) : "";
    //No cookie is set, so the function returns an empty object/false
    if (!decoded_URI_component) {
        return return_type == 'object' ? {} : false;
    }
    let cookie_search = `${cookie_name}=`;
    let cookie = {};
    /*
    console.log(`Nome do cookie procurado: '${cookie_name}'`);
    console.log(`String procurada: '${cookie_search}'`);
    console.log(`Lista de cookies: '${decoded_URI_component}'`);
    */
    if (decoded_URI_component.includes(cookie_search)) {
        let cookie_parts = decoded_URI_component.split(';');
        for (let i = 0; i < cookie_parts.length; i++) {
            if (cookie_parts[i].includes(cookie_name)) {
                let cookie_string = cookie_parts[i];
                let parts = (cookie_string.trim()).split('=');
                let name = parts[0];
                if (parts[0] == cookie_name) {
                    let value = parts[1];
                    cookie[name] = value;
                    return cookie;
                    break;
                }
            }
        }
    } else {
        return false;
    }
}

//Gets all cookies | Success return: object | Fail return: empty object OR false
export function get_cookies(return_type = 'object') {
    let decoded_URI_component = document.cookie ? decodeURIComponent(document.cookie) : "";
    if (!decoded_URI_component) return return_type == 'object' ? {} : false;
    let cookies_parts = decoded_URI_component.split(';');
    //console.log(cookies_parts);
    let cookies = {};
    cookies_parts.forEach((cookie) => {
        cookie = cookie.trim();
        let parts = cookie.split('=');
        let name = parts[0];
        let value = parts[1];
        cookies[name] = value;
    });
    //console.log(cookies);
    return cookies;
}

/* App */
const feedback_element = document.querySelector("#feedback-element");

function set(miliseconds = time.hour) {
    let cookie_name = document.querySelector('input[name=cookie-name]').value;
    if (miliseconds > 0) {
        //Setting cookie
        let cookie_value = document.querySelector('input[name=cookie-value]').value;
        if (!cookie_value || !cookie_name) {
            //Empty cookie value
            feedback_element.textContent = `Digite o nome e valor do cookie!`;
            feedback_element.className = "text-danger";
        } else {
            //Non empty cookie value
            if (set_cookie(cookie_name, cookie_value, time.hour)) {
                //Cookie set successfully
                feedback_element.innerHTML = `Cookie <b>${cookie_name}</b> salvo com sucesso!`;
                feedback_element.className = "text-success";
            } else {
                //Cookie was not set
                feedback_element.innerHTML = `Cookie <b>${cookie_name}</b> não pôde ser salvo!`;
                feedback_element.className = "text-danger";
            }
        }
    } else {
        //Deleting a cookie
        if (set_cookie(cookie_name, 'deleted', miliseconds)) {
            feedback_element.innerHTML = `Cookie <b>${cookie_name}</b> deletado com sucesso`;
            feedback_element.className = "text-success";
        }
    }
    //Waitsfor half of a second and lists all cookies
    setTimeout(() => {
        get_all(cookie_name);
    }, feedback_element_time);
}

function get_all() {
    let cookie_names = get_cookies('object');
    //console.log(cookie_names);
    let text = "";
    if (Object.keys(cookie_names).length > 0) {
        for (cookie_name in cookie_names) {
            text += `${cookie_name}: ${cookie_names[cookie_name]} <br> `;
            feedback_element.className = "text-dark";
        }
    } else {
        text = "Não há Cookies cadastrados";
        feedback_element.className = "text-danger";
    }
    feedback_element.innerHTML = text;
}

function get() {
    let cookie_name = document.querySelector('input[name=cookie-name]').value;
    if (!cookie_name) {
        //Empty cookie name
        feedback_element.textContent = "Digite o nome do cookie!";
        feedback_element.className = "text-danger";
    } else {
        //Non empty cookie name
        let cookie = get_cookie(cookie_name);
        if (cookie) {
            //Cookie was found
            let cookie_key = Object.keys(cookie)[0];
            feedback_element.textContent = `${cookie_key}: ${cookie[cookie_key]}`;
            feedback_element.className = "text-dark";
        } else {
            //Cookie was not found
            feedback_element.innerHTML = `Cookie <b>${cookie_name}</b> não encontrado!`;
            feedback_element.className = "text-danger"
        }
    }

}

function delete_all() {
    let cookies = get_all();
    cookies.forEach((cookie) => {
        set(cookie, time.yesterday)
    });
}