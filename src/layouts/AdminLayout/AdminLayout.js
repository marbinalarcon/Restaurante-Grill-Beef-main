import React from "react";
import { LoginAdmin } from "../../pages/Admin";
import "./AdminLayout.scss";
import {TopMenu, SideMenu} from "../../components/Admin";
import { useAuth } from "../../hooks";


export function AdminLayout(props) {
  const { children } = props;
  const { auth } = useAuth();

  if (!auth) return <LoginAdmin></LoginAdmin>;

  return (
    <div className="admin-layout">
      <div className="admin-layout__menu">
        <TopMenu></TopMenu>
      </div>
      <div className="admin-layout__main-content">
          <SideMenu>{children}</SideMenu>
      </div>
    </div>
  );
}
