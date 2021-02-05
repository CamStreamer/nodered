
module.exports = function(RED) {
    function ServiceEnablingNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.co_node = RED.nodes.getNode(config.service)

        node.on('input', function(msg) {
          this.log(this.co_node.camera.auth);
          msg.payload = config.enable;
          let co_service = this.co_node.coAPI;
          co_service.setEnabled(config.enable == "1");
          this.send(msg);
        });
    }
    RED.nodes.registerType("enable-service",ServiceEnablingNode);
}
