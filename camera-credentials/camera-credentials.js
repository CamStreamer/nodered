module.exports = function(RED) {
    function CameraCredentials(n) {
        RED.nodes.createNode(this,n);
        this.ip = n.ip;
        this.port = n.port;
        this.auth = n.user+":"+n.password;
    }
    RED.nodes.registerType("camera-credentials",CameraCredentials);
}