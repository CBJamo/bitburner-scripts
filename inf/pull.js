let baseUrl = 'https://raw.githubusercontent.com/CBJamo/bitburner-scripts/blob/master/';
let url = path => `${baseUrl}${path}`;

async function get(ns, path)
{
	return await ns.wget(url(path), path.split('/').pop());
}

export async function main(ns)
{
	let hostname = ns.getHostname();
	cleanHost( ns, hostname );

	await ns.wget(url('inf/deploy.json'), 'deploy.txt');
	let deploy = JSON.parse( ns.read('deploy.txt') );
	for (let i of deploy.files)
	{
		await get(ns, i);
	}
	ns.tprint('<span style="color:white">Done updating!</span>');

	ns.run('launcher.js');
}
