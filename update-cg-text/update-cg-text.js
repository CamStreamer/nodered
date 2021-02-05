
module.exports = function(RED) {
    function COCGupdateTextNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.co_node = RED.nodes.getNode(config.service)

        node.on('input', function(msg) {
          let fields = [];
          for (let f of config.fields){
            let field = {
              field_name: extractValue(f.v,f.vt, msg, this),
              text: extractValue(f.tx,f.txt, msg, this)
            };
            fields.push(field)
          }
          co_service = this.co_node.coAPI;
          co_service.updateCGText(fields);
          msg.payload = fields;
          node.send(msg);

        });
    }
    RED.nodes.registerType("update-cg-text",COCGupdateTextNode);
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

