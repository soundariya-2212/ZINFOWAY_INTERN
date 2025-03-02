import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Assets/Style/Attendancemark.css';

const AttendanceMark = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const departments = ['All', 'CSE', 'IT', 'EEE', 'Mech', 'ECE', 'Civil', 'CSE-IOT', 'CSE-AIML', 'CSE-CS'];
  const years = ['All', 'I', 'II', 'III', 'IV'];

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        let filteredStudents = response.data.filter(user => user.category === 'student');
        
        // Apply filters based on selected department and year
        filteredStudents = filteredStudents.filter(student => {
          return (
            (selectedDepartment === 'All' || student.department === selectedDepartment) &&
            (selectedYear === 'All' || student.year === selectedYear)
          );
        });

        setStudents(filteredStudents);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, [selectedDepartment, selectedYear, selectedWeek]);

  useEffect(() => {
    axios.get('http://localhost:3000/attendance')
      .then(response => {
        setAttendanceData(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  };

  const isDuplicateAttendanceRecord = () => {
    const currentDate = getCurrentDate();

    return attendanceData.some(session => {
      if (session.date === currentDate) {
        return session.records.some(record => {
          return students.some(student => {
            return (
              student.id === record.studentId &&
              student.username === record.name &&
              student.department === record.department &&
              student.year === record.year
            );
          });
        });
      }
      return false;
    });
  };

  const handleSaveAttendance = () => {
    if (isDuplicateAttendanceRecord()) {
      alert('The attendance has already been marked.');
      return;
    }

    const currentDate = getCurrentDate();
    
    // Format attendance records for all students
    const formattedAttendance = students.map(student => {
      return {
        studentId: student.id,
        name: student.username,
        department: student.department,
        year: student.year,
        date: currentDate,
        attendances: student.attendance || 'Not Marked', // Use existing attendance status or default to 'Not Marked'
      };
    });

    // Save attendance for current date
    axios.post('http://localhost:3000/attendance', { date: currentDate, records: formattedAttendance })
      .then(response => {
        console.log('Attendance data saved successfully:', response.data);
        // After successful save, update the attendanceData state
        setAttendanceData([...attendanceData, response.data]);
      })
      .catch(error => {
        console.error('Error saving attendance data:', error);
      });
  };

  const markAttendance = (id, status) => {
    const updatedStudents = students.map(student => {
      if (student.id === id) {
        return { ...student, attendance: status };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  return (
    <div className="attendance-container">
      <h1>Attendance Page</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="department">Department:</label>
        <select
          id="department"
          value={selectedDepartment}
          onChange={e => setSelectedDepartment(e.target.value)}
        >
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <label htmlFor="year">Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <label htmlFor="week">Week:</label>
        <input
          type="week"
          id="week"
          value={selectedWeek || ''}
          onChange={e => setSelectedWeek(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.username}</td>
              <td>{student.department}</td>
              <td>
                <select
                  value={student.attendance || 'Not Marked'}
                  onChange={(e) => markAttendance(student.id, e.target.value)}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Not Marked">Not Marked</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button1" onClick={handleSaveAttendance}>Save Attendance</button>
    </div>
  );
};

export default AttendanceMark;