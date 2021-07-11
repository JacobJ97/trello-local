import TopBar from './components/TopBar.js';
import Board from './components/Board.js';
//import Footer from './components/Footer.js';
import Modal from './components/Modal.js';
import { useState, useEffect } from 'react';

const App = () => {
  
  const [sections, setSections] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [sectionID, setSectionID] = useState('');

  const [modalState, setModalState] = useState(false);
  const [modalStateSection, setModalStateSection] = useState(false); 
  const [modalStateSettings, setModalStateSettings] = useState(false);
  const [modalStateTasks, setModalStateTasks] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    const getSections = async () => {
      let sectionData = await fetchSections();
      setSections(sectionData);
    }

    const getTasks = async () => {
      let taskData = await fetchTasks();
      setTasks(taskData)
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

  const addTaskModal = (sectionID) => {
    setModalState(true);
    setModalStateTasks(true);
    setModalTitle('Add Task');
    setSectionID(sectionID);
  }

  const addSection = async (section) => {
    const res = await fetch('/api/section', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(section) });
    const data = await res.json();
    setSections([...sections, data]);
  }

  const addTask = async (task) => {
    const res = await fetch('/api/task', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(task) });
    const data = await res.json();
    setTasks([...tasks, data]);
  }

  const deleteSection = async (id) => {
    await fetch(`/api/section/${id}`, { method: 'DELETE' });
    setSections(sections.filter((section) => section.section_id !== id ));
  }

  const deleteTask = async (id) => {
    await fetch(`/api/task/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(task => task.task_id !== id));
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
  }

  return (
    <div className="App">
      <TopBar onAddModal={addSectionModal} onSettingsModal={getSettingsModal} modalActive={modalState} />
      {modalState && (<Modal sectionModal={modalStateSection} settingsModal={modalStateSettings} tasksModal={modalStateTasks} modalVisible={closeAll} title={modalTitle} onAddSection={addSection} onAddTask={addTask} sectionIDForTask={sectionID} />)}
      <Board sections={sections} tasks={tasks} onAddModal={addTaskModal} modalActive={modalState} deleteSection={deleteSection} deleteTask={deleteTask} />
    </div>
  );
}

export default App;