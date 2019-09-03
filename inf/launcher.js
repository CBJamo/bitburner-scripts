export async function main( ns )
{
	let deploy = JSON.parse( ns.read('deploy.txt') );

	for( exe of deploy.run )
	{
		ns.run( exe.name, exe.threads, exe.args... );
	}
}
