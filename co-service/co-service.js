
module.exports = function(RED) {
    const CamOverlayAPI = require('camstreamerlib/CamOverlayAPI');
    function CustomGraphicsService(n) {
        RED.nodes.createNode(this,n);
        this.camera = RED.nodes.getNode(n.camera);
        this.serviceID = n.serviceID;
        this.coAPI = new CamOverlayAPI({
            'ip': this.camera.ip,
            'port': this.camera.port,
            'auth': this.camera.auth,
            'serviceID': this.serviceID,
        });
    }
    RED.nodes.registerType("co-service",CustomGraphicsService);
}