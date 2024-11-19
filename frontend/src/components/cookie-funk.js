export function CookiesFunc () {
    var cookie_list = document.cookie.split("; ");
    var i;
    for (i = 0; i < cookie_list.length; i++) {
        if (cookie_list[i].includes("status_cookie")) {
            var status_cookie_list = cookie_list[i].split("=");
            var status_cookie = status_cookie_list[1];
          }
        if (cookie_list[i].includes("angaj_cookie")) {
            var angaj_cookie_list = cookie_list[i].split("=");
            var angaj_cookie = angaj_cookie_list[1];
        }
        if (cookie_list[i].includes("of_cookie")) {
            var of_cookie_list = cookie_list[i].split("=")
            var of_cookie = of_cookie_list[1]
        }
        if (cookie_list[i].includes("position")) {
            var position_list = cookie_list[i].split("=")
            var position = position_list[1]
        }
        // if (cookie_list[i].includes("file_link_al")) {
        //     var file_link_al_list = cookie_list[i].split("=")
        //     var file_link_al = file_link_al_list[1]
        // }
        // if (cookie_list[i].includes("semnatura_link")) {
        //     var semnatura_link_list = cookie_list[i].split("=")
        //     var semnatura_link = semnatura_link_list[1]
        // }
        // if (cookie_list[i].includes("reg_al")) {
        //     var reg_al_list = cookie_list[i].split("=")
        //     var reg_al = reg_al_list[1]
        // }
    }
    return [
        status_cookie, 
        angaj_cookie,
        of_cookie,  
        position,
        // file_link_al,
        // semnatura_link,
    ]
}