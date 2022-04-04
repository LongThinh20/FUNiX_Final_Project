import React, { useState } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  NavbarToggler
} from "reactstrap";

import { NavLink } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar className="nav" expand="md">
        <Container>
          <NavbarBrand href="/"></NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink className="nav-link" to="/admin/charity">
                  DANH SÁCH QUYÊN GÓP
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="nav-link" to="/admin/addCharity">
                  THÊM /CẬP NHẬTCHƯƠNG TRÌNH TỪ THIỆN
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
