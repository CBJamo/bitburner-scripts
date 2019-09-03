import {spider} from "network.js";

// Return how many ports we can pop
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

