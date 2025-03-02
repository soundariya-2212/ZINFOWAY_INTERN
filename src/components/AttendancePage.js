import React, { useState, useEffect } from 'react';
import '../Assets/Style/attendancemark.css';

const AttendancePage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const departments = ['CSE', 'IT','EEE', 'Mech', 'ECE', 'Civil', 'CSE-IOT', 'CSE-AIML', 'CSE-CS'];
  const sections = ['A', 'B', 'C'];

  // Helper function to get past dates
  const getPastDates = (days) => {
    const today = new Date();
    const pastDates = Array.from({ length: days }, (_, index) => {
      const date = new Date();
      date.setDate(today.getDate() - index);
      return date.toISOString().split('T')[0];
    });
    return pastDates;
  };

  const dates = getPastDates(7); // Function to get the past 7 days (including today)

  const generateRandomStudents = () => {
    const students = [];
    for (let i = 1; i <= 10; i++) {
      const departmentIndex = Math.floor(Math.random() * departments.length);
      const sectionIndex = Math.floor(Math.random() * sections.length);
      const student = {
        id: i,
        name: `Student ${i}`,
        attendance: {},
        department: departments[departmentIndex],
        section: sections[sectionIndex],
      };
      // Initialize random attendance for the past week
      dates.forEach(date => {
        const randomStatusIndex = Math.floor(Math.random() * 3); // 0 for Present, 1 for Absent, 2 for Not Marked
        const status = ['Present', 'Absent', 'Not Marked'][randomStatusIndex];
        student.attendance[date] = status;
      });
      students.push(student);
    }
    return students;
  };

  const [studentsData, setStudentsData] = useState(generateRandomStudents());

  const [students, setStudents] = useState(studentsData);

  const updateAttendance = (id, date, newStatus) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? { ...student, attendance: { ...student.attendance, [date]: newStatus } }
          : student
      )
    );
  };

  const calculateAttendancePercentage = (student) => {
    const totalDays = Object.keys(student.attendance).length;
    const presentDays = Object.values(student.attendance).filter((status) => status === 'Present').length;
    return totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 'N/A';
  };

  useEffect(() => {
    const filteredStudents = studentsData.filter(
      (student) =>
        (selectedDepartment === 'All' || student.department === selectedDepartment) &&
        (selectedSection === 'All' || student.section === selectedSection)
    );

    const weekStart = selectedWeek ? new Date(selectedWeek) : null;
    const filteredStudentsWeek = filteredStudents.map((student) => {
      const attendance = Object.entries(student.attendance)
        .filter(([date]) => {
          const currentDate = new Date(date);
          return (
            (!weekStart || currentDate >= weekStart) &&
            (!selectedMonth || currentDate.getMonth() === selectedMonth)
          );
        })
        .reduce((acc, [date, status]) => ({ ...acc, [date]: status }), {});

      return { ...student, attendance };
    });

    setStudents(filteredStudentsWeek);
  }, [selectedDepartment, selectedSection, selectedWeek, selectedMonth, studentsData]);

  return (
    <div className="attendance-container"> {/* Wrap the table inside a div with the desired background color */}
      <h1>Attendance Page</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="department"> Department:  </label>
        <select
          id="department"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="All">All</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <label htmlFor="section">  Section:  </label>
        <select
          id="section"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="All">All</option>
          {sections.map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>
        <label htmlFor="week">  Week:  </label>
        <input
          type="week"
          id="week"
          value={selectedWeek || ''}
          onChange={(e) => setSelectedWeek(e.target.value)}
        />
        <label htmlFor="month">  Month:  </label>
        <input
          type="month"
          id="month"
          value={`selectedMonth ? 2024-${selectedMonth.toString().padStart(2, '0')} : ''`}
          onChange={(e) => setSelectedMonth(new Date(e.target.value).getMonth())}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            {dates.map((date) => (
              <th key={date}>{date}</th>
            ))}
            <th>Attendance Percentage</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              {dates.map((date) => (
                <td key={date}>
                  <select
                    style={{
                      backgroundColor:
                        student.attendance[date] === 'Present'
                          ? '#8aff8a'
                          : student.attendance[date] === 'Absent'
                          ? '#ff8a8a'
                          : student.attendance[date] === 'Not Marked'
                          ? '#ffff8a'
                          : 'inherit',
                    }}
                    value={student.attendance[date] || 'Not Marked'}
                    onChange={(e) => updateAttendance(student.id, date, e.target.value)}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Not Marked">Not Marked</option>
                  </select>
                </td>
              ))}
              <td>{calculateAttendancePercentage(student)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;