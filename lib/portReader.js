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

export async function main( ns )
{
    let out = '';
    if( ns.args.length == 3)
        out = searchPort( ns, ns.args[0], ns.args[1], ns.args[2] );
    else
        out = searchPort( ns, ns.args[0] );
    
    ns.tprint( JSON.stringify(out, null, 2) );
}
