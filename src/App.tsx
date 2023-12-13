import {Container} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import {Store} from "./pages/Store";
import {Checkout} from "./pages/Checkout";
import {Item} from "./pages/Item";
import {Navbar} from "./components/Navbar";
import {ShoopingCartProvider} from "./contexts/ShoppingCartContext";

function App() {
  return (
    <ShoopingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/item" element={<Item />} />
        </Routes>
      </Container>
    </ShoopingCartProvider>
  );
}

export default App;
