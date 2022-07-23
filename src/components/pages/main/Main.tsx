import SideBar from '../sidebar/SideBar';
import MainContent from './MainContent';

/**
 * メイン画面。
 */
const Main = () => {
  return (
    <>
      <div style={{ display: 'flex', height: '100vh', overflowY: 'hidden' }}>
        <SideBar />
        <MainContent />
      </div>
    </>
  );
};

export default Main;
