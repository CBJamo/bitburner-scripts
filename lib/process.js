// Kill all other scripts on this host
export function killOther( ns )
{
	let procs = ns.ps();
	let ownProc = ns.getScriptName();
	let hostname = ns.getHostname();

	for( let proc of procs )
	{
		if( proc.filename == ownProc )
			continue;
		ns.scriptKill( proc.filename, hostname );
	}
}

// Kill all procs on a list of servers
export function netKillall(ns, servers)
{
    for( let server of servers)
    {
        ns.tprint("Killing all on " + server);
        ns.killall(server);
    }
}


