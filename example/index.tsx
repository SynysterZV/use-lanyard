import React from 'react';
import {createRoot} from 'react-dom/client';
import {useLanyard, useLanyardWS} from '../src/index';

function App() {
	const rest = useLanyard('268798547439255572');
	const socket = useLanyardWS('268798547439255572');

	// Example showing built in request deduplication.
	// The four requests below will only result in
	// one request to the API. The other three will
	// be resolved from the cache.
	useLanyard('268798547439255572');
	useLanyard('268798547439255572');
	useLanyard('268798547439255572');
	useLanyard('268798547439255572');

	return (
		<pre>
			<code>{JSON.stringify({rest, socket}, null, 2)}</code>

			<button onClick={rest.revalidate}>revalidate</button>
		</pre>
	);
}

createRoot(document.getElementById('root')!).render(<App />);
