import React from 'react';
import Calendar from 'react-calendar';


class CollegeCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(), // Current date
    };
  }

  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>College Calendar 2024</h1>
        <div style={styles.calendarContainer}>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
            tileContent={this.tileContent}
          />
        </div>
      </div>
    );
  }

  // Function to render content for each tile (date) on the calendar
  tileContent = ({ date, view }) => {
    // Check if the year is 2024
    if (date.getFullYear() !== 2024) return null;

    // Get the month, day, and day of the week of the date
    const month = date.getMonth();
    const day = date.getDate();
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Define events based on month, day, and day of the week
    const events = {
      0: { 1: { content: 'Revision', color: 'blue' } }, // January 1st - Revision 1
      1: { 2: { content: 'Revision', color: 'blue' } }, // January 2nd - Revision 2
      2: { 15: { content: 'Cultural Events', color: 'yellow' } }, // March 15th - Cultural Events
      3: { 1: { content: 'Hostel Day', color: 'yellow' } }, // April 1st - Hostel Day
      4: { // May
        8: { content: 'Basketball', color: 'grey' }, // May 8th - Basketball
        10: { content: 'Football', color: 'grey' }, // May 10th - Football
        12: { content: 'Hockey', color: 'grey' }, // May 12th - Hockey
        14: { content: 'Badminton', color: 'grey' }, // May 14th - Badminton
      },
      5: { // June
        21: { content: 'Study Holiday starts', color: 'lightgreen' }, // June 21st - Study Holiday
        25: { content: 'Semester Exams start', color: 'purple' }, // June 25th - Semester Exams
      },
      6: { // July
        1: { content: 'Holiday starts', color: 'lightgrey' }, // July 1st - Holiday
        14: { content: 'Holiday ends', color: 'lightgrey' }, // July 15th - Holiday
        15: { content: 'New Semester Starts', color: 'teal' }, // July 16th - New Semester Starts
      },
    };

    // Highlight last week of June for exams and study holidays
    if (month === 5 && day >= 25) {
      return <div style={styles.highlight}>Last week of June</div>;
    }

    // Highlight sports events in the second week of May
    if (month === 4 && day >= 8 && day <= 14) {
      return <div style={styles.highlight}>Intercollege competition</div>;
    }

    // Check if there's an event for the current date
    const eventForDate = events[month] && events[month][day];

    // Return content if there's an event
    if (eventForDate) {
      return (
        <div style={{ ...styles.event, backgroundColor: eventForDate.color }}>
          {eventForDate.content}
        </div>
      );
    }

    return null;
  };

  // Function to handle date change
  onChange = date => {
    this.setState({ date });
  };
}

const styles = {
  container: {
    textAlign: 'center',
    margin: 'auto',
    maxWidth: '700px', 
    height:'800%'// Adjust the max width as needed
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  calendarContainer: {
    display: 'inline-block',
    border: '5px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  highlight: {
    backgroundColor: '#87CEFA',
    textAlign: 'center',
    fontSize: '0.8em',
    padding: '5px',
    borderRadius: '5px',
    margin: '5px',
  },
  event: {
    textAlign: 'center',
    fontSize: '0.8em',
    padding: '5px',
    borderRadius: '5px',
    margin: '5px',
  },
};

export default CollegeCalendar;
