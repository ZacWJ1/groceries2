import React, { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(BarElement, Tooltip, Legend, Title);

const Piechart = ({ refreshKey }) => { // Accept refreshKey as a prop
  const [grocers, setGrocers] = useState([]);
  const [unique, setUnique] = useState([]);
  const [counts, setCounts] = useState({});

  // Fetch grocery data when refreshKey changes
  useEffect(() => {
    const fetchGrocers = async () => {
      try {
        const res = await axios.get('https://groceries2backend.onrender.com/groceries', { withCredentials: true });
        setGrocers(res.data);
      } catch (error) {
        console.error("Error fetching grocery data", error);
      }
    };
    fetchGrocers();
  }, [refreshKey]); // Add refreshKey as a dependency

  // Process grocery data whenever the grocers state changes
  useEffect(() => {
    const uniqueTypes = [...new Set(grocers.map(item => item.type))];
    setUnique(uniqueTypes);

    const countMap = {};
    grocers.forEach(item => {
      countMap[item.type] = (countMap[item.type] || 0) + 1;
    });
    setCounts(countMap);
  }, [grocers]);

  // Chart data configuration
  const data = {
    labels: unique,
    datasets: [
      {
        label: '# of items',
        data: unique.map(type => counts[type] || 0),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 109, 64, 0.6)',
          'rgba(125, 169, 34, 0.8)',
          'rgba(225, 99, 251, 0.3)',
          'rgba(225, 99, 101, 0.4)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 109, 64, 0.6)',
          'rgba(125, 169, 34, 0.8)',
          'rgba(225, 99, 251, 0.3)',
          'rgba(225, 99, 101, 0.4)',
        ],
        borderWidth: 1,
        offset: [20, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        
        <div className="row">
          <div className="col-md-5 mb-3 mt-3">
            <Pie
              width={100}
              height={100}
              data={data}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    text: 'Your Groceries',
                    display: true,
                    font: { size: 20 },
                  },
                  legend: {
                    labels: {
                      font: { size: 15 },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Piechart;
