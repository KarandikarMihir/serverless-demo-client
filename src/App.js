import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './upload.svg';
import './App.css';
import uploadToBlobStorage from './uploadToBlobStorage'

class App extends Component {
  onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      uploadToBlobStorage(file).then(() => toast("Done! Check blob storage...", {
        position: toast.POSITION.TOP_CENTER
      }))
    }
  }

  onUploadClick = () => this.fileRef.click()

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <header className="App-header">
          <input type="file" onChange={this.onFileChange} ref={ref => { this.fileRef = ref }} />
          <img src={logo} className="App-logo" alt="logo" onClick={this.onUploadClick} />
          <p><b>UPLOAD YOUR SELFIE!</b> 🤳</p>
        </header>
      </div>
    );
  }
}

export default App;
