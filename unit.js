exports.moment = () => {
    function f(data) {
        return data < 10 ? '0' + data : data;
    }
    var date = new Date();
    var YYYY = date.getFullYear();
    var MM = date.getMonth() + 1;
    var DD = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    return {
        format: function(str) {
            str = str.replace(/yyyy|YYYY/, YYYY);
            str = str.replace(/yy|YY/, f(YYYY % 100));
            str = str.replace(/MM/, f(MM));
            str = str.replace(/M/, MM);
            str = str.replace(/dd|DD/, f(DD));
            str = str.replace(/d|D/, DD);
            str = str.replace(/hh|HH/, f(hh));
            str = str.replace(/h|H/, hh);
            str = str.replace(/mm/, f(mm));
            str = str.replace(/m/, mm);
            str = str.replace(/ss|SS/, f(ss));
            str = str.replace(/s|S/, ss);
            return str;
        }
    };
};
