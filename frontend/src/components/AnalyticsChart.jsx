import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

  CartesianGrid

} from "recharts";

import "../styles/chart.css";

function AnalyticsChart({ students }) {

  const departmentMap = {};

  students.forEach((student) => {

    const dept =
      student.department || "Unknown";

    if (departmentMap[dept]) {

      departmentMap[dept]++;

    } else {

      departmentMap[dept] = 1;
    }
  });

  const chartData =
    Object.keys(departmentMap).map(
      (dept) => ({

        department: dept,

        students:
          departmentMap[dept]
      })
    );

  return (

    <div className="chart">

      <h2>
        Department Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={chartData}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="department" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="students"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;