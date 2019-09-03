export async function main( ns )
{
	let args = ['Hello', 'World'];

	ns.run('start.js', 1, args...);
}
