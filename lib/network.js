// Return an array of all identifiable servers
export function spider(ns) {

    // Create a serversSeen array, containing only 'home' for now
    let  serversSeen = ns.getPurchasedServers();
    serversSeen.push("home");

    // For every server we've seen so far, do a scan
    for (let i = 0; i < serversSeen.length; i++) {
        let thisScan = ns.scan(serversSeen[i]);
        // Loop through results of the scan, and add any new servers
        for (let j = 0; j < thisScan.length; j++) {
            // If this server isn't in serversSeen, add it
            if (serversSeen.indexOf(thisScan[j]) === -1) {
                serversSeen.push(thisScan[j]);
            }
        }
    }
    return serversSeen;
}

// Search the json in a port for specific data
export function searchPort( ns, port, key='', value='' )
{
    let data = JSON.parse( ns.peek(port) );
    let out = [];
    
    if( (key != '') && (value != '') )
    {
        for( let item of data )
        {
            if( item[key] == value )
            {
                out.push(item);
            }
        }
    }
    else
    {
        out = data;
    }
    
    return out;
}

export function getNetRam( ns )
{
	let servers = spider( ns );

	let networkRam = [0, 0];
	for( let server of servers )
	{
		let ram = ns.getServerRam( server )
		networkRam[0] += ram[0];
		networkRam[1] += ram[1];
	}

	return networkRam;
}
