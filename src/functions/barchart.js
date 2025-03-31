import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Barchart = ({ refreshKey }) => {
  const [grocers, setGrocers] = useState([]);
  const [unique, setUnique] = useState([]);
  const [counts, setCounts] = useState({});

  // Fetch grocery data when the component mounts or when refreshKey changes
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

  // Process grocery data whenever grocers state changes
  useEffect(() => {
    const uniqueExpirations = [...new Set(grocers.map(item => item.expiration))];
    setUnique(uniqueExpirations);

    const countMap = {};
    grocers.forEach(item => {
      countMap[item.expiration] = (countMap[item.expiration] || 0) + 1;
    });
    setCounts(countMap);
  }, [grocers]);

  const data = {
    labels: unique,
    datasets: [
      {
        label: 'Grocery Expirations',
        data: unique.map(exp => counts[exp] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        
        <div className="row">
          <div className="col-md-5 mb-3 mt-3">
            <Bar
              options={
                text='Your Expirations'
              }
              width={100}
              height={100}
              data={data}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Barchart;
