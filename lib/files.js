// Remove every file you can from a host
export function cleanHost( ns, hostname )
{
	let files = ls( hostname );
	for( let file of files )
	{
		ns.rm( file, hostname );
	}
}
