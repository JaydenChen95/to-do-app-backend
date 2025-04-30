const allowedStatus = ['Uncompleted', 'Completed', 'Pending'];

export function validate({
  description,
  status,
  subTasks,
}){
  if(!description){
    console.error('Description should not be invalid!');
    return false;
  }

  if(!validateStatus(status)){
    console.error('Status is invalid');
    return false;
  }

  if(subTasks){
    const subTaskWithNoStatus = subTasks.find(subTask => !subTask.status 
        || !validateStatus(subTask.status));
    if(subTaskWithNoStatus){
      console.error('Subtask must have a valid status');
      return false;
    }
  }

  return true;
}

export function validateStatus(status) {
  return allowedStatus.includes(status);
}
