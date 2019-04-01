var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(queue_name, msg_payload, callback){
    console.log('Making Request...');
	rpc.makeRequest(queue_name, msg_payload, function(err, response){
		if(err)
			console.error("make request: Error Encountered\n");
		else{
			console.log("make_request: Response Recieved \n");
			callback(null, response);
		}
	});
}

exports.make_request = make_request;