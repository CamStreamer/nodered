
module.exports = function(RED) {
    const CamStreamerAPI = require('camstreamerlib/CamStreamerAPI');
    function CustomGraphicsService(n) {
        RED.nodes.createNode(this,n);
        this.camera = RED.nodes.getNode(n.camera);
        this.serviceID = n.serviceID;
        this.streamer = new CamStreamerAPI({
            'ip': this.camera.ip,
            'port': this.camera.port,
            'auth': this.camera.auth
        });
    }
    RED.nodes.registerType("cst-service",CustomGraphicsService);
}