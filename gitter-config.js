module.exports = function(RED) {
    function RemoteServerNode(config) {
        RED.nodes.createNode(this, config);
        this.token = config.token;
    }
    RED.nodes.registerType("gitter-config", RemoteServerNode, {
        credentials: {
            token: { type: "password" }
        }
    });
}