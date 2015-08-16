/**
 * @file upload file to remote dev-machine (receiver.php)
 * @author nighca<nighca@live.cn>
 */

var fs = require('fs');
var path = require('path');
var Url = require('url');

var targets = require('./targets.json');

var map = function (obj, callback, merge) {
    var index = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (merge) {
                callback[key] = obj[key];
            }
            else if (callback(key, obj[key], index++)) {
                break;
            }
        }
    }
};

var parseUrl = function (url, opt) {
    opt = opt || {};
    url = Url.parse(url);
    var ssl = url.protocol === 'https:';
    opt.host = opt.host
        || opt.hostname
        || ((ssl || url.protocol === 'http:') ? url.hostname : 'localhost');
    opt.port = opt.port || (url.port || (ssl ? 443 : 80));
    opt.path = opt.path || (url.pathname + (url.search ? url.search : ''));
    opt.method = opt.method || 'GET';
    opt.agent = opt.agent || false;
    return opt;
};

var upload = function (url, opt, data, content, subpath, callback) {
    if (typeof content === 'string') {
        content = new Buffer(content, 'utf8');
    }
    else if (!(content instanceof  Buffer)) {
        callback('unable to upload content [' + (typeof content) + ']');
        return;
    }

    data = data || {};

    var endl = '\r\n';
    var boundary = '-----np' + Math.random();
    var collect = [];

    // create request body
    map(data, function (key, value) {
        collect.push('--' + boundary + endl);
        collect.push('Content-Disposition: form-data; name="' + key + '"' + endl);
        collect.push(endl);
        collect.push(value + endl);
    });
    collect.push('--' + boundary + endl);
    collect.push('Content-Disposition: form-data; name="file"; filename="' + subpath + '"' + endl);
    collect.push(endl);
    collect.push(content);
    collect.push('--' + boundary + '--' + endl);

    // calc the content-length
    var length = 0;
    collect.forEach(function (ele) {
        length += ele.length;
    });

    // construct http-request option
    opt = opt || {};
    opt.method = opt.method || 'POST';
    opt.headers = {
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
        'Content-Length': length
    };
    opt = parseUrl(url, opt);

    var http = opt.protocol === 'https:' ? require('https') : require('http');

    // construct request
    var req = http.request(opt, function (res) {
        var status = res.statusCode;
        var body = '';
        res
            .on('data', function (chunk) {
                body += chunk;
            })
            .on('end', function () {
                if (status >= 200 && status < 300 || status === 304) {
                    callback(null, body);
                    return;
                }

                callback(status, body);
            })
            .on('error', function (err) {
                callback(err.message || err);
            });
    });

    // write request body
    collect.forEach(function (d) {
        req.write(d);
        if (d instanceof Buffer) {
            req.write(endl);
        }
    });

    // end request
    req.end();
};

module.exports = function (file, to, target, callback) {
    target = targets[target];
    if (!target) {
        throw new Error('Invalid target!');
    }

    to = target.odpdir + '/' + to;

    upload(
        target.rdtest + '/static/receiver.php',
        null,
        {to: to},
        fs.readFileSync(file),
        path.basename(to),
        function (err, res) {
            if (!callback) {
                return;
            }

            if (err || res.trim() !== '0') {
                callback(err || res);
                return;
            }

            callback(null);
        }
    );
};
