import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useContext } from "react";
import Cart from "../Cart/Cart";
import CartContext from "../../store/cart-context";
import AuthForm from "../Auth/AuthForm";
import AuthContext from "../../store/auth-context";
import AddProduct from "../Products/AddProduct";

const Header = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.isAdmin;

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const handleCloseCart = () => setShowCart(false);
  const handleOpenCart = () => setShowCart(true);

  const handleCloseAuth = () => setShowAuth(false);
  const handleOpenAuth = () => setShowAuth(true);

  const handleCloseAddProduct = () => setShowAddProduct(false);
  const handleOpenAddProduct = () => setShowAddProduct(true);

  const handleLogout = () => {
    authCtx.logout();
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="">Sklepik</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="">Produkty</Nav.Link>
              {isLoggedIn && !isAdmin && (
                <Nav.Link onClick={handleOpenCart}>
                  Koszyk <Badge bg="secondary">{numberOfCartItems}</Badge>
                </Nav.Link>
              )}
              {isAdmin && (
                <Nav.Link onClick={handleOpenAddProduct}>
                  Dodaj produkt
                </Nav.Link>
              )}
            </Nav>
            <Nav className="justify-content-end">
              <NavDropdown title="Profil" id="basic-nav-dropdown">
                {!isLoggedIn && (
                  <NavDropdown.Item onClick={handleOpenAuth}>
                    Rejestracja/Logowanie
                  </NavDropdown.Item>
                )}
                {isLoggedIn && (
                  <NavDropdown.Item onClick={handleLogout}>
                    Wyloguj
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart showCart={showCart} onClose={handleCloseCart} />
      <AuthForm showAuth={showAuth} onClose={handleCloseAuth} />
      <AddProduct
        showAddProduct={showAddProduct}
        onClose={handleCloseAddProduct}
      />
    </div>
  );
};

export default Header;
