import {searchPort} from "network.js"

export async function main( ns )
{
    let out = '';
    if( ns.args.length == 3)
        out = searchPort( ns, ns.args[0], ns.args[1], ns.args[2] );
    else
        out = searchPort( ns, ns.args[0] );
    
    ns.tprint( JSON.stringify(out, null, 2) );
}
