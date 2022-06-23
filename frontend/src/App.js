import './App.css'
import Navbar from './components/Navbar.js'

function App() {
  return (
    <>
		<Navbar/>
		<div className="row">
			<div className="col">
				<h1 className="h1 text-center">Witamy w sklepie Januszex!</h1>
			</div>
		</div> 
		<div className="row">
			<div className="col text-center h3 mt-5">
				Znajdziesz tu wszystko, co jest potrzebne do urządzenia domu. <br/> Zapraszamy do zapoznania się z naszą ofertą
			</div>
		</div>
		<img src='https://as2.ftcdn.net/v2/jpg/03/18/37/59/1000_F_318375953_txbFqlDB2ULXSU1hK5qQICiUR9nX4bGo.jpg' align="right" height="500px" alt='Harold1'/>
		<img src='https://as2.ftcdn.net/v2/jpg/03/18/37/59/1000_F_318375996_x1ngOi3bkon1yAYjamJP4GTsNu3bnPsa.jpg' align="left" height="500px" alt='Harold2'/>
    </>
  );
}

export default App;
