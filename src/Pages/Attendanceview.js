import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Assets/Style/Attendancemark.css';

const AttendanceView = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  const departments = ['All', 'CSE', 'IT', 'EEE', 'Mech', 'ECE', 'Civil', 'CSE-IOT', 'CSE-AIML', 'CSE-CS'];
  const years = ['All', 'I', 'II', 'III', 'IV'];

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setStudents(response.data.filter(user => user.category === 'student'));
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/attendance')
      .then(response => {
        setAttendanceData(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  const getAttendanceForDate = (studentId, date) => {
    const studentAttendance = attendanceData.find(session => session.date === date)?.records.find(record => record.studentId === studentId);
    return studentAttendance ? studentAttendance.attendances : 'Not Marked';
  };

  const filteredStudents = students.filter(student => {
    if (selectedDepartment !== 'All' && student.department !== selectedDepartment) {
      return false;
    }
    if (selectedYear !== 'All' && student.year !== selectedYear) {
      return false;
    }
    return true;
  });

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
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            {Array.from({ length: 7 }, (_, i) => new Date(new Date().setDate(new Date().getDate() - i)).toISOString().split('T')[0]).map(date => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.username}</td>
              {Array.from({ length: 7 }, (_, i) => new Date(new Date().setDate(new Date().getDate() - i)).toISOString().split('T')[0]).map(date => (
                <td key={date}>{getAttendanceForDate(student.id, date)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceView;