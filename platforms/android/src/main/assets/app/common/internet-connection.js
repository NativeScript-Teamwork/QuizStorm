var networkConnection = (function() {
	var connectivity = require("connectivity");

	var connectionType = connectivity.getConnectionType();
	var type = '';
	switch (connectionType) {
    	case connectivity.connectionType.none:
    		type = 'none';
    		console.log("No connection");
    		break;
    	case connectivity.connectionType.wifi:
        	type = 'wifi';
        	console.log("WiFi connection");
        	break;
    	case connectivity.connectionType.mobile:
        	type = 'mobile';
        	console.log("Mobile connection");
        	break;
	}

	return type;
})();

exports.networkType = networkConnection;