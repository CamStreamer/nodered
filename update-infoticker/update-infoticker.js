
module.exports = function(RED) {
    function updateCOInfoticker(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.co_node = RED.nodes.getNode(config.service);

        node.on('input', async function(msg) {

          this.log(this.co_node.camera.auth);
          let changing_text = extractValue(config.text, config.textType, msg, node);
          let co_service = this.co_node.coAPI;
          await co_service.updateInfoticker(changing_text);
          msg.payload = [changing_text, config.textType];
          node.send(msg);
        });
    }
    RED.nodes.registerType("update-infoticker",updateCOInfoticker);
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

