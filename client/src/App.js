import TopBar from './components/TopBar.js';
import Board from './components/Board.js';
//import Footer from './components/Footer.js';
import Modal from './components/Modal.js';
import { useState, useEffect } from 'react';

const App = () => {
  
  const [sections, setSections] = useState([]);
  const [tasks, setTasks] = useState({});

  const [modalState, setModalState] = useState(false);
  const [modalStateSection, setModalStateSection] = useState(false); 
  const [modalStateSettings, setModalStateSettings] = useState(false);
  const [modalStateTasks, setModalStateTasks] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [sectionID, setSectionID] = useState('');
  const [orderID, setOrderID] = useState('');

  useEffect(() => {
    const getSections = async () => {
      let sectionData = await fetchSections();
      setSections(sectionData);
    }

    const getTasks = async () => {
      let taskDict = {};
      let taskData = await fetchTasks();
      taskData.forEach((task) => {
        let i = task.SectionSectionId; 
        if (taskDict[i]) {
          taskDict[i].push(task)
        } else { 
          taskDict[i] = [task]
        }
      });
      setTasks(taskDict)
    }

    getSections();
    getTasks();
  }, []);

  const fetchSections = async () => {
    const res = await fetch("/api/section")
    const data = await res.json();
    return data;
  }

  const fetchTasks = async () => {
    const res = await fetch("/api/task")
    const data = await res.json();
    return data;
  }
 
  const addSectionModal = () => {
    setModalState(true);
    setModalStateSection(true);
    setModalTitle('Add Section')
  }

  const addTaskModal = (sectionID, orderID) => {
    setModalState(true);
    setModalStateTasks(true);
    setModalTitle('Add Task');
    setSectionID(sectionID);
    setOrderID(orderID)
  }

  const addSection = async (section) => {
    const res = await fetch('/api/section', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(section) });
    const data = await res.json();
    setSections([...sections, data]);
  }

  const addTask = async (task, sectionIDTask) => {
    const res = await fetch('/api/task', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(task) });
    const data = await res.json();
    setTasks({...tasks, [sectionIDTask]: [...tasks[sectionIDTask], data]});
  }

  const changeOrder = async (dictId, task, startingIndex, orderIndex) => {
    let id = tasks[dictId][startingIndex].task_id;
    let sectionID = tasks[dictId][startingIndex].SectionSectionId;
    await fetch(`/api/task/${id}`, {method: 'PUT', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({orderID: orderIndex+1, startingIndex: startingIndex+1, sectionIDForTask: sectionID})});
    setTasks({
      ...tasks,
      [dictId]: task
    });
  }

  const moveItem = async (idSource, idDestination, itemSource, itemDestination, startIndex, endIndex, destinationSectionID) => {
    let id = tasks[idSource][startIndex].task_id;
    let sectionID = tasks[idSource][startIndex].SectionSectionId;
    await fetch(`/api/task/${id}`, {method: 'PUT', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({orderID: endIndex+1, sectionIDForTask: sectionID, destinationSectionID: destinationSectionID})});
    setTasks({
      ...tasks,
      [idSource]: itemSource,
      [idDestination]: itemDestination
    });
  }

  const deleteSection = async (id) => {
    await fetch(`/api/section/${id}`, { method: 'DELETE' });
    setSections(sections.filter((section) => section.section_id !== id ));
  }

  const deleteTask = async (id, sectionIDForTask, taskOrder) => {
    await fetch(`/api/task/${id}`, { method: 'DELETE', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({orderID: taskOrder, sectionIDForTask: sectionIDForTask}) });
    let sectionTasks = tasks[sectionIDForTask];
    let modTasks = sectionTasks.map(task => task.SectionSectionId === sectionIDForTask && task.task_order > taskOrder ? {...task, task_order: task.task_order - 1} : task).filter(task => task.task_id !== id)
    setTasks({...tasks, [sectionIDForTask]: modTasks});
  }

  const editSectionSubmit = async (id, sectionName) => {
    await fetch(`/api/section/${id}`, {method: 'PUT', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({section: sectionName})});
    setSections(sections.map((section) => section.section_id === id ? {...section, section_name: sectionName} : section));
  }

  const editTask = async (id, argument, argumentParam, taskField, sectionIDForTask) => {
    await fetch(`/api/task/${id}`, {method: 'PUT', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({[argumentParam]: taskField})});
    let sectionTasks = tasks[sectionIDForTask];
    let modTasks = sectionTasks.map((task) => task.task_id === id ? {...task, [argument]: taskField} : task )
    setTasks({...tasks, [sectionIDForTask]: modTasks});
  }
 
  /*const changeSettings = () => {

  }*/
 
  const getSettingsModal = () => {
    setModalState(true);
    setModalStateSettings(true);
    setModalTitle('Settings')
  }

  const closeAll = () => {
    setModalState(false);
    setModalStateSettings(false);
    setModalStateSection(false);
    setModalStateTasks(false);
    setSectionID('');
    setOrderID('');
  }

  return (
    <div className="App">
      <TopBar onAddModal={addSectionModal} onSettingsModal={getSettingsModal} modalActive={modalState} />
      {modalState && (<Modal sectionModal={modalStateSection} settingsModal={modalStateSettings} tasksModal={modalStateTasks} modalVisible={closeAll} title={modalTitle} onAddSection={addSection} onAddTask={addTask} sectionIDForTask={sectionID} orderID={orderID} />)}
      <Board sections={sections} tasks={tasks} onAddModal={addTaskModal} modalActive={modalState} deleteSection={deleteSection} deleteTask={deleteTask} editSection={editSectionSubmit} editTask={editTask} changeOrder={changeOrder} moveItem={moveItem} />
    </div>
  );
}

export default App;