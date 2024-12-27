


import React, { useState } from 'react';
import SidebarMenu from 'react-bootstrap-sidebar-menu';



const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <SidebarMenu
      expand={expanded}
      className={`d-flex flex-column ${expanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
    >
      <SidebarMenu.Body>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link href="#home">Home</SidebarMenu.Nav.Link>
          <SidebarMenu.Nav.Link href="#about">About</SidebarMenu.Nav.Link>
          <SidebarMenu.Nav.Link href="#services">Services</SidebarMenu.Nav.Link>
          <SidebarMenu.Nav.Link href="#contact">Contact</SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
      </SidebarMenu.Body>
      <button
        className="btn btn-primary m-3"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Collapse' : 'Expand'}
      </button>
    </SidebarMenu>
  );
};

export default Sidebar;
