import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Select_Toggle, Menu, Menu_Toggle, Ruler, Select } from '../../components';
import logo from '/pilot_coding.svg';
import { container, main_page } from './index.module.css';

function Main() {
  const
    [select_state, set_select_state] = useState(false),
    select_toggle = useCallback(_ => set_select_state(state => !state), [set_select_state]),
    [menu_state, set_menu_state] = useState(false),
    menu_toggle = useCallback(_ => set_menu_state(state => !state), [set_menu_state]);

  return (
    <div className={`${main_page}`}>
      <header className={`flex-ai-center`}>
        <img src={logo} alt='Logo' title='Pilot Coding' />
        <Select_Toggle state={select_state} toggle={select_toggle} />
        <Menu_Toggle toggle={menu_toggle} />
      </header>
      <Ruler />
      <div className={`${container}`}>
        <Select state={select_state} toggle={select_toggle} />
        <Menu state={menu_state} toggle={menu_toggle} />
        <Outlet />
      </div>
    </div>
  );
}

export { Main };