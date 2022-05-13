import React from 'react'
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import HeaderAdmin from "../admin/layouts/Header";
import Sidebar from '../admin/layouts/Sidebar'
import '../admin/assets/scss/style.scss'
import { useSelector } from 'react-redux';
const Admin = () => {
  const { user } = useSelector(state => state.userInfo)

  
  return (
    <main>
      <HeaderAdmin userInfo={user && user}/>
      <Row>
        <div className="d-flex">
          <Col xl="2">
            <aside className="sidebarArea shadow" id="sidebarArea">
              <Sidebar userInfo={user && user}/>
            </aside>
          </Col>
          <Col xl='10'>
            <div className="contentArea">
              <Container className="pt-4" fluid>
                <Outlet/>
              </Container>
            </div>
          </Col>
        </div>
      </Row>
    </main>
  )
}

export default Admin
