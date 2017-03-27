import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
            <TimersDashboard />
        </div>
      </div>
    );
  }
}

class TimersDashboard extends Component {
  render() {
    return (
      <div>
        <EditableTimersList />
        <ToogleableTimerForm 
          isOpen={false}
        />
      </div>
    );
  }
}

class EditableTimersList extends Component {
  editTaskHandler = (taskId) => {
    let editedTask = this.state.timers.map(task=>{
      if(taskId===task.id){
        if(task.isEdit){
          return Object.assign({}, task, {isEdit : false});
        } else{
          return Object.assign({}, task, {isEdit : true});
        }
      } else {
        return task;
      }
    });
    this.setState({timers : editedTask});
  };
  removeTaskHandler = (taskId) => {
    let removedTask = this.state.timers.filter(task=>{
      console.log(taskId);
      return taskId !== task.id;
    });
    this.setState({timers : removedTask});
  };
  state = {
    timers : [
      {
        id : 1,
        isEdit : false,
        title : 'Some title',
        task : 'Some task',
        image : 'https://wylsa.com/wp-content/uploads/2016/10/cvjnkgzvyaa_fce.jpg',
        time : Date.now()
      },
      {
        id : 2,
        isEdit : false,
        title : 'Some title',
        task : 'Some task',
        image : 'http://cdn-static.denofgeek.com/sites/denofgeek/files/styles/main_wide/public/2017/02/logan_ver6_xlg_0.jpg?itok=5-QOtmla',
        time : Date.now()
      },
      {
        id : 3,
        isEdit : false,
        title : 'Some title',
        task : 'Some task',
        image : 'http://cdn-static.denofgeek.com/sites/denofgeek/files/styles/main_wide/public/2017/02/logan_ver6_xlg_0.jpg?itok=5-QOtmla',
        time : Date.now()
      }
    ]
  };
  render() {
    const timers = this.state.timers.map((timer)=>(
      <EditableTimer
        key={timer.id} 
        id={timer.id}
        isEdit={timer.isEdit}
        title={timer.title}
        task={timer.task}
        image={timer.image}
        time={timer.time}
        editTask={this.editTaskHandler}
        removeTask={this.removeTaskHandler}
      />
    ));
    return (
      <div>
        {timers}
      </div>
    );
  }
}

class EditableTimer extends Component {
  editTaskClick = () =>{
    this.props.editTask(this.props.id);
  };
  removeTaskClick = () =>{
    this.props.removeTask(this.props.id);
  };
   render() {
    if(this.props.isEdit){
      return (
      <div className='timer'>
        <div className="row">
          <div className="col-sm-6 col-md-4 col-md-offset-4">
            <div className="thumbnail">
              <div className="caption">
                <input type='text' placeholder='image url' className='form-control' onChange={this.handleImage} />
                <input type='text' placeholder='task title' className='form-control' onChange={this.handleTitle} />
                <input type='text' placeholder='task description' className='form-control' onChange={this.handleTask} />
                <p>
                  <a className="btn btn-primary" role="button">Save</a> 
                  <a className="btn btn-default" role="button" onClick={this.editTaskClick}>Cancel</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      ); 
    } else {
      return (
        <div className='timer'>
          <div className="row">
            <div className="col-sm-6 col-md-4 col-md-offset-4">
              <div className="thumbnail">
                <img src={this.props.image} alt="..." />
                <div className="caption">
                  <h3>{this.props.title}</h3>
                  <p>{this.props.task}</p>
                  <p>
                    <a className="btn btn-primary" role="button" onClick={this.editTaskClick}>Edit</a> 
                    <a className="btn btn-default" role="button" onClick={this.removeTaskClick}>Remove</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

class ToogleableTimerForm extends Component {
  state = {
    isOpen : this.props.isOpen
  }
  handleShowForm = () =>{
    if(this.state.isOpen){
      this.setState({isOpen : false});
    } else {
      this.setState({isOpen : true});
    }
  }
  render() {
    if(this.state.isOpen){
      return (
        <div className="row">
          <div className="col-sm-6 col-md-4 col-md-offset-4">
            <div className="thumbnail">
              <div className="caption">
                <input type='text' placeholder='image url' className='form-control' />
                <input type='text' placeholder='task title' className='form-control' />
                <input type='text' placeholder='task description' className='form-control' />
                <p>
                  <a className="btn btn-primary" role="button">Create</a> 
                  <a className="btn btn-default" role="button" onClick={this.handleShowForm}>Cancel</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-sm-6 col-md-4 col-md-offset-4">
            <div className="thumbnail plus">
              <a className='plus' onClick={this.handleShowForm}><i className='glyphicon glyphicon-plus'/></a>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
