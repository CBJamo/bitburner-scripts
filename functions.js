export function ports( ns )
{
    let ports = 0;
    if (ns.fileExists("BruteSSH.exe", "home")) {
        ports += 1;
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
        ports += 1;
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
        ports += 1;
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
        ports += 1;
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
        ports += 1;
    }
   
    return ports;
}

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

// Run all available port opening scripts, then nuke the server
export function unlock(ns, hostname){
    if (ns.fileExists("BruteSSH.exe", "home")) {
        ns.brutessh(hostname);
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
        ns.ftpcrack(hostname);
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
        ns.relaysmtp(hostname);
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
        ns.httpworm(hostname);
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
        ns.sqlinject(hostname);
    }

    return ns.nuke(hostname);
}

// Attempt to nuke all servers
export function unlock_all(ns)
{
    let servers = spider(ns);
    let have_root = [];
    
    for( let server of servers)
    {
        try {
            unlock(ns, server);
            have_root.push(server);
        }
        catch ( e )
        {
            ns.print( e );
        }
    }
    
    return have_root;
}

export function killall_all(ns, servers)
{
    for( let server of servers)
    {
        ns.tprint("Killing all on " + server);
        ns.killall(server);
    }
}
