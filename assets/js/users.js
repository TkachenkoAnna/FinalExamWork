USER = {
    login: function(username, password) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/auth/token/',
            contentType: 'application/json',
            data: JSON.stringify({ "username": username, "password": password }),
            type: 'post',
            dataType: 'json',
            success: function(json) {
                d.resolve(json);
            },
            error: function(err) {
                d.reject(err);
            }
        });
        return d.promise();
    },
    register: function(email, username, password) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/auth/signup/',
            contentType: 'application/json',
            data: JSON.stringify({ "email": email, "username": username, "password": password }),
            type: 'post',
            dataType: 'json',
            success: function(json) {
                d.resolve(json);
            },
            error: function(err) {
                d.reject(err);
            }
        });
        return d.promise();
    },
    refreshToken: function() {
        let d = $.Deferred();
        const refresh_token = localStorage.getItem("refresh_token");
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/auth/token/refresh/',
            contentType: 'application/json',
            data: JSON.stringify({ "refresh": refresh_token }),
            type: 'post',
            dataType: 'json',
            success: function(json) {
                localStorage.setItem('access_token', json.access);
                localStorage.setItem('refresh_token', json.refresh);
                d.resolve(json);
            },
            error: function(err) {
                if (err.status == "401") {
                    USER.logout();
                } else {
                    d.reject(err);
                }
            }
        });
        return d.promise();
    },
    logout: function() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('logged');
        loadPage('login');
    }
};

function loginUser($btn) {
    if (!$btn.hasClass("disabled")) {
        $btn.addClass("disabled");
        let username = $("input#username").val(),
            password = $("input#password").val(),
            valid = true;
        if (username == "") {
            valid = false;
        }
        if (password == "") {
            valid = false;
        }
        if (valid) {
            USER.login(username, password).done(function(json) {
                localStorage.setItem('access_token', json.access);
                localStorage.setItem('refresh_token', json.refresh);
                localStorage.setItem('logged', 'true');
                loadPage('main');
            });
        } else {
            alert("Enter username/password");
            $btn.removeClass("disabled");
        }
    }
}

function isValidEmail(email) {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function registerUser($btn) {
    if (!$btn.hasClass("disabled")) {
        $btn.addClass("disabled");
        let username = $("input#reg_username").val(),
            email = $("input#reg_email").val(),
            password = $("input#reg_password").val(),
            password2 = $("input#reg_password2").val(),
            valid = true,
            msg = [];
        if (email == "") {
            valid = false;
            msg.push('Enter email.');
        } else {
            if (!isValidEmail(email)) {
                valid = false;
                msg.push('Email is incorrect.');
            }
        }
        if (username == "") {
            valid = false;
            msg.push('Enter username.');
        }
        if (password != "" && password2 != "") {
            if (password != password2) {
                valid = false;
                msg.push('Password and repeat password do not match.');
            }
        } else {
            valid = false;
            msg.push('Enter password/repeat password.');
        }
        if (valid) {
            USER.register(email, username, password).done(function(json) {
                alert("Successfully registered");
                setTimeout(function() {
                    loadPage('login');
                }, 3000);
                /*localStorage.setItem('access_token', json.access);
                localStorage.setItem('refresh_token', json.refresh);
                localStorage.setItem('logged', 'true');
                loadPage('main');*/
            });
        } else {
            alert(msg.join(' '));
            $btn.removeClass("disabled");
        }
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};