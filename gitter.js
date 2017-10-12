module.exports = function(RED) {

    if (false) { // Test for nodes compatibilities
        throw "Info : not compatible";
    }

    function NodeConstructor(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            node.send(msg);

            var Gitter = require('node-gitter');
            var gitter = new Gitter(config.credentials.token);

            gitter.currentUser()
                .then(function(user) {
                    // console.log('You are logged in as:', user.username);
                    node.status({ fill: "green", shape: "dot", text: 'You are logged in as: ' + user.username });

                }).then(function() {
                    gitter.rooms.join(config.channel)
                        .then(function(room) {
                            console.log('Joined room: ', room.name);
                        })
                        .fail(function(err) {
                            console.log('Not possible to join the room: ', err);
                        })
                });

        });
        node.on("close", function() {});
    };

    RED.nodes.registerType("Gitter", NodeConstructor);
}