import Header from './components/header/header.jsx'
import FileUploadBox from './components/fileUploadBox/fileUploadBox.jsx'
import BlackButton from './components/blackButton/blackButton.jsx'
import './App.css'

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='main-content'>
        {/* Keep the line breaks */}
        <h1 className='title-text'> 
          Web-based AirDrop <br/>
          Share Images Free
        </h1>
        <FileUploadBox />
        <BlackButton text={"or Download Using Code"} onClick={() => {console.log("wowza");}}/>
      </div>
    </div>
  )
}

export default App
