self.onmessage = function (event) {
	const data = event.data;
	console.log("Worker received data:", data);
	let result = 0;
	for (let i = 0; i < data.limit; i++) {
		result += i;
	}
	self.postMessage({ result });
};
