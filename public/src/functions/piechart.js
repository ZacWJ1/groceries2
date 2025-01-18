import React,{useState, useEffect} from "react";
import { Chart as ChartJS, BarElement, Tooltip, Legend,  Title} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios'
//import { Bar } from "react-chartjs-2";
ChartJS.register(BarElement, Tooltip, Legend, Title);

//import { PieChart } from '@mui/x-charts/PieChart';


const Piechart = () => {

  const [grocers, setGrocers] = useState([]);
  const [unique, setUnique] = useState([]);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchGrocers = async () => {
      const res = await axios.get('http://localhost:4444/groceries');
      setGrocers(res.data);
    };
    fetchGrocers();
  }, []);

  useEffect(() => {
    const uniqueTypes = [...new Set(grocers.map(item => item.type))];
    setUnique(uniqueTypes);

    const countMap = {};
    grocers.forEach(item => {
      countMap[item.type] = (countMap[item.type] || 0) + 1;
    });
    setCounts(countMap);
  }, [grocers]);

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
   /* const [country, setCountry]= useState([]);
    const [population, setPopulation]=useState([]);
    useEffect( ()=>{
      const getcountry=[];
      const getpopulation=[];
     const getdata= async()=>{
       const reqData= await fetch('http://localhost:4444/groceries');
       const resData= await reqData.json();
       //console.log(resData);
       //
       
       //
       for(let i=0; i<resData.length; i++)
       {
        getcountry.push(resData[i].type);
        getpopulation.push(resData[i].cost);
        /*let getpopulation=resData[i].type
        getpopulation.filter((resData[i].type)x=>x==='meat').length*/
      /* }     
       setCountry(getcountry);
       setPopulation(getpopulation);
     }
   getdata();
    },[])*/
    
    //trying to get count
    /*
    const langObject = resData.reduce((langs, { languages }) => {
      return languages.nodes.reduce((repLangs, { name, color }) => {
        if (!repLangs[name]) {
          repLangs[name] = { count: 0, color };
        }
        repLangs[name].count += 1;
        return repLangs;
      }, langs);
    }, {});
  
    const langArray = formatLanguagesForChart(langObject);
  
    return langArray.sort((a, b) => b.value - a.value).slice(0, 5)
      */
    //

  return (
    <React.Fragment>
      <div className="container-fluid">
        <h3 className="mt-3">View your distribution of groceries!</h3>
        <div className="row">
          <div className="col-md-5 mb-3 mt-3 ">
            <Pie
              width={100}
              height={100}
              data={data}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    text: 'Your Groceries Chart',
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

export default Piechart
