import React, {MouseEventHandler, useCallback, useContext, useState} from 'react';
import './App.css';

const SearchBar = () => {
    return (<input type={"text"} className="app-search-bar" />);
};

const Gap = () => {
    return (<div className="app-gap" />);
};

const Header = () => {
  return (
      <header className='app-header'>
          My Portfolio
          <Gap />
          <SearchBar />
      </header>);
};

const NavBar = ({ children }: React.PropsWithChildren) => {
  return (<nav className='app-nav'>
    {children}
  </nav>)
};

const Footer = () => {
  return (<footer className='app-footer'>
  </footer>);
}

const Main = () => {
    const { selectedItem } = useContext(AppContext);
  return (
    <main className='app-main'>
        <div className='app-main-content'>
            {selectedItem}
        </div>
      <Footer />
    </main>
  );
};

type NavBarItemProps = React.PropsWithChildren<{
    title: string;
    href: string;
    active?: boolean;
    id: string;
}>;
const NavBarItem = ({ title, active, id }: NavBarItemProps) => {
    const { setSelected } = useContext(AppContext);
    const navItemClickHandler: MouseEventHandler<HTMLLIElement> = useCallback(event => {
        event.preventDefault();
        setSelected(id);
        console.log(id);
    }, [id, setSelected]);
    return (<li className={`app-nav-item${active ? ' active' : ''}`} onClick={navItemClickHandler}>
        {title}
    </li>)
};

const NavBarItems = [
    { title: 'Home', href: '/', id: 'home' },
    { title: 'About', href: '/about', id: 'about' },
    { title: 'Contact', href: '/contact', id: 'contact' },
    { title: 'Portfolio', href: '/portfolio', id: 'portfolio' },
];

const AppContext = React.createContext<{
    selectedItem?: string | null;
    setSelected: (elementId: string) => void;
}>({
    selectedItem: null,
    setSelected: () => {}
});

function App() {
    const [selectedItem, setSelected] = useState<string>('home');
  return (
      <AppContext.Provider value={{ selectedItem, setSelected }}>
          <div className='app'>
              <Header/>
              <NavBar>
                  {NavBarItems.map((params) => <NavBarItem active={selectedItem === params.id} {...params} key={params.id} />)}
              </NavBar>
              <Main />
          </div>
      </AppContext.Provider>
  );
}

export default App;
