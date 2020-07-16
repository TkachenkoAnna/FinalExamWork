PRICES = {
    getList: function(h_id, r_id) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/hotels/' + h_id + '/rooms/' + r_id + '/prices/',
            method: 'get',
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
    getOne: function(h_id, r_id, p_id) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/hotels/'+ h_id +'/rooms/' + r_id + '/prices/' + p_id + '/',
            method: 'get',
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
    add: function(h_id, r_id, data) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/hotels/' + h_id + '/rooms/' + r_id + '/prices/',
            method: 'post',
            data: data,
            processData: false,
            enctype: 'multipart/form-data',
            contentType: false,
            cache: false,
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem("access_token"));
            },
            success: function(json) {
                d.resolve(json);
            },
            error: function(err) {
                if (err.status == "403") {
                    USER.refreshToken().done(function() {
                        d.resolve(PRICES.add(h_id, r_id, data));
                    });
                } else {
                    d.reject(err);
                }
            }
        });
        return d.promise();
    },
    update: function(h_id, r_id, p_id, data) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/hotels/' + h_id +'/rooms/' + r_id + '/prices/' + p_id + '/',
            method: 'patch',
            data: data,
            processData: false,
            enctype: 'multipart/form-data',
            contentType: false,
            cache: false,
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem("access_token"));
            },
            success: function(json) {
                d.resolve(json);
            },
            error: function(err) {
                if (err.status == "403") {
                    USER.refreshToken().done(function() {
                        d.resolve(PRICES.update(h_id, r_id, p_id, data));
                    });
                } else {
                    d.reject(err);
                }
            }
        });
        return d.promise();
    },
    delete: function(h_id, r_id, p_id) {
        let d = $.Deferred();
        $.ajax({
            url: 'https://beetroot.quidow.pp.ua/api/hotels/'+ h_id + '/rooms/' + r_id + '/prices/' + p_id + '/',
            method: 'delete',
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem("access_token"));
            },
            success: function(json) {
                d.resolve(json);
            },
            error: function(err) {
                if (err.status == "403") {
                    USER.refreshToken().done(function() {
                        d.resolve(PRICES.delete(h_id, r_id, p_id));
                    });
                } else {
                    d.reject(err);
                }
            }
        });
        return d.promise();
    }   
};