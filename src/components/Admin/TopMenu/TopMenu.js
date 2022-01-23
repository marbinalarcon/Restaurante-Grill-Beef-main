import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { useAuth } from "../../../hooks";
import "./TopMenu.scss";

export function TopMenu() {
  const { auth, logout } = useAuth();

  const renderName = () => {
    if (auth.me?.username) {
      return auth.me.username;
    }
    return auth.me?.email;
  };

  return (
    <Menu fixed="top" className="top-menu-admin">
      <Menu.Item className="top-menu-admin__logo">
        <p>Restaurante Parrilla Res</p>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item> Bienvienido {renderName()}</Menu.Item>
        <Menu.Item onClick={logout}>
          <Icon name="sign-out"></Icon>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
