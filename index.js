import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Peer from 'skyway'

const peer = new Peer({key: '2c2ce3b1-109c-47b8-a375-bade5f77e2fd'})
let localStream

peer.on('open', id => document.querySelector("#myid").innerHTML = id)

peer.on('call', call => {
  call.answer(localStream)
  call.on('stream', stream => document.querySelector('video#peer-video').srcObject = stream)
})


navigator.mediaDevices.getUserMedia({video: true, audio: true})
  .then(stream => {
    localStream = stream
    document.querySelector("video#my-video").srcObject = stream
  })
  .catch(err => console.warn(err.message))


document.querySelector("#connect").addEventListener("submit", ev => {
  ev.preventDefault()
  const peerid = document.querySelector("#connect input[name=peerid]").value
  console.log(peerid)

  const call = peer.call( peerid, localStream )
  call.on('stream', stream => document.querySelector('video#peer-video').srcObject = stream)
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
