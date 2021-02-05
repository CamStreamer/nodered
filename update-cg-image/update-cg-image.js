
module.exports = function(RED) {
    function COCGupdateImageNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.co_node = RED.nodes.getNode(config.service)

        node.on('input', function(msg) {
          this.log(this.co_node.camera.auth);
          let co_service = this.co_node.coAPI;
          switch(config.action){
            case "img":
              let true_path = extractValue(config.path, config.path_type, msg, node);
              msg.payload = [true_path,config.coords, config.pos_x, config.pos_y];

              co_service.updateCGImage(true_path,config.coords,config.pos_x,config.pos_y);
              break;
            default:
              co_service.updateCGImagePos(config.coords,config.pos_x,config.pos_y);
              break;
          }
          this.send(msg);
        });
        function extractValue(prop, type, msg, node){
          switch(type){
            case "flow":
            case "global":
              let contextKey = RED.util.parseContextStore(prop)
              let target = node.context()[type];
              return target.get(contextKey.key,contextKey.store);
              break;

            case "msg":
              let retval = RED.util.getMessageProperty(msg,prop);
              return retval
              break;

            default:
              return prop;
          }
        }
    }
    RED.nodes.registerType("update-cg-image",COCGupdateImageNode);
}
