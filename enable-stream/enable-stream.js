
module.exports = function(RED) {
    function ServiceEnablingNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.co_node = RED.nodes.getNode(config.service)

        node.on('input', function(msg) {
          this.log(this.co_node.camera.auth);
          msg.payload = config.enable;
          let cst = this.co_node.streamer
          cst.setStreamParameter(this.co_node.serviceID, "enabled", config.enable);
          this.send(msg);
        });
    }
    RED.nodes.registerType("enable-stream",ServiceEnablingNode);
}
