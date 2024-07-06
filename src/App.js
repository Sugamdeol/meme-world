import MemeGallery from "./components/MemeGallery";
import AppNavbar from "./components/Navbar";
import MemeEditor from "./components/MemeEditor";
import Footer from "./components/Footer";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppNavbar />
        <h1>Welcome to Meme World</h1>
        <p>Discover, Create, and Share Memes</p>
      </header>
      <MemeGallery />
      <MemeEditor />
      <Footer />
    </div>
  );
}

export default App;
