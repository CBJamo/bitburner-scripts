let baseUrl = 'https://raw.githubusercontent.com/CBJamo/bitburner-scripts/master/';
let url = path => `${baseUrl}${path}`;

async function get(ns, path) {
	    return await ns.wget(url(path), path.split('/').pop());
}

export async function main(ns) {
	    let files = ['readme.md'];
	    for (let i in files)
		        await get(ns, files[i]);
	    ns.tprint('<span style="color:white">Done updating!</span>');
}
