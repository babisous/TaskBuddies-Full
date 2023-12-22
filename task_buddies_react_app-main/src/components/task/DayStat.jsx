import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskTile from "./TaskTile";

import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, taskSliceActions } from "../../store/dashboard/task"; 

const Daystat = () => {
  //const [tasks, setTasks] = useState([]);

  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.task);

  const validatedTasksCount = tasks.filter(task => task.validated === true).length;
  const percentageValidated = (validatedTasksCount / tasks.length) * 100;



  return (
     <div className="componentContainer">
<div className="componentHeader">
  <p>Ma journée</p>
</div>
<p>Pourcentage de tâches validées : {percentageValidated}%</p>

</div>
);

}
  export default Daystat;
