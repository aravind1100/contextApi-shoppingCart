import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Card from "./Components/Card";
import Header from "./Components/Header";
import ProductProvider from "./Components/ProductContext";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";

const App = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
    <ProductProvider>
     
        <Header />
        <main className="container-fluid my-4" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Card />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<div>404: Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      
    </ProductProvider>
    </div>
  );
};

export default App;
