function padLeft(n, str) {
    return Array(n - String(this).length + 1).join(str || '0') + this;
}

if (!Date.prototype.format) {
    Date.prototype.format = function(f) {
        f = f.replace(/yyyy/g, this.getFullYear());
        f = f.replace(/MM/g, this.getMonth() + 1);
        f = f.replace(/dd/g, this.getDate());
        f = f.replace(/d\*/g, this.getDate());
        return f;
    };
}



module.exports = Date;