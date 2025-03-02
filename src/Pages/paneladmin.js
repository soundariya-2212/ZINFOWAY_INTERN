import React from 'react';
import { FaUserFriends, FaCalendarAlt, FaCheckSquare, FaCog, FaBars } from 'react-icons/fa';
import Attendance from './Attenfancemark';
import CollegeCalendar from './Calendar';
import AddUser from './Adduser';
import AttendanceMark from './Attenfancemark';
import AttendanceView from './Attendanceview';
import Img from './Ima';
import AdminUsers from './AdminEditUser';
// import AttendanceMark from './AttendanceMark'; // Import the component for attendance marking
// import AttendanceView from './AttendanceView'; // Import the component for attendance viewing

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: null,
      sideMenuOpen: false // Add state to manage side menu visibility
    };
  }

  handleClick = (page) => {
    // You can implement the redirection logic here
    console.log(`Redirecting to ${page} page...`);
    this.setState({ activePage: page });
  }

  toggleSideMenu = () => {
    this.setState((prevState) => ({ sideMenuOpen: !prevState.sideMenuOpen }));
  }

  renderPage = () => {
    const { activePage } = this.state;
    switch (activePage) {
      case 'View Attendance':
        return <AttendanceView/>;
      case 'Mark Attendance':
        return <AttendanceMark/>;
      case 'calendar':
        return <CollegeCalendar/>;
      case 'logout':
        return <AdminUsers/>;
      default:
        return <Img/>;
    }
  }

  render() {
    const { sideMenuOpen } = this.state;

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Side menu icon */}
        <div style={styles.sideMenuIcon} onClick={this.toggleSideMenu}>
          <FaBars style={{ fontSize: '18px', cursor: 'pointer' }} />
        </div>
        {/* Panel */}
        <div style={sideMenuOpen ? { ...styles.panel, ...styles.panelOpen } : styles.panel}>
          <h2>Topics</h2>
          <ul style={styles.iconList}>
            <li onClick={() => this.handleClick("View Attendance")} className={this.state.activePage === "View Attendance" ? "active" : ""}>
              <FaUserFriends style={styles.icon} />
              <span>t1</span>
            </li>
            <li onClick={() => this.handleClick("Mark Attendance")} className={this.state.activePage === "Mark Attendance" ? "active" : ""}>
              <FaCheckSquare style={styles.icon} />
              <span>t2</span>
            </li>
            <li onClick={() => this.handleClick("calendar")} className={this.state.activePage === "calendar" ? "active" : ""}>
              <FaCalendarAlt style={styles.icon} />
              <span>t3</span>
            </li>
            <li onClick={() => this.handleClick("logout")} className={this.state.activePage === "logout" ? "active" : ""}>
              <FaCog style={styles.icon} />
              <span>t4</span>
            </li>
          </ul>
        </div>
        {/* Content */}
        <div style={styles.content}>
          {this.renderPage()}
        </div>
      </div>
    );
  }
}

const styles = {
  panel: {
    backgroundColor: '#ADD8E6',
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '20%',
    transition: 'width 0.3s ease' // Add transition for smooth animation
  },
  panelOpen: {
    width: '5%', // Set a little width even when the panel is collapsed
  },
  sideMenuIcon: {
    position: 'absolute',
    top: '20px',
    left: '20px',
  },
  iconList: {
    listStyleType: 'none',
    padding: 0,
    fontSize: '2em',
    textAlign: 'center',
  },
  icon: {
    cursor: 'pointer', // Add hand cursor
    marginBottom: '10px', // Add margin to separate icon and text
  },
  content: {
    flex: 1,
    padding: 20,
    display: 'flex',
    justifyContent: 'center', // Center the image horizontally
    alignItems: 'center', // Center the image vertically
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    margin: 'auto', // Center the image horizontally
  },
};

export default AdminPage;
