const userId = 'id-'+Math.floor(Math.random()*100000);
const socket = io('ws://127.0.0.1:8022', {
	path: '/room',
	query: {
		'from': userId
	}
});
socket.on('message', data=>{
	console.log(data);
});
function msgSend(){
	socket.emit('message', {
		from: userId,
		to: 'osar',
		data: document.querySelector('#room1').value
	});
}