import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
	await client.hSet('car', {
		color: 'red',
		year: 2009
	});

	const car = await client.hGetAll('car');
	console.log('car --->', car);
};
run();
