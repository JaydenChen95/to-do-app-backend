const allowedStatus = ['Uncompleted', 'Completed', 'Pending', 'Deleted'];

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
    const invalidSubtask = subTasks.find(subTask => 
      !subTask.status 
        || !subTask.description
        || !validateStatus(subTask.status));
    if(invalidSubtask){
      console.error('Subtask must have a valid description and status');
      return false;
    }
  }

  return true;
}

export function validateStatus(status) {
  return allowedStatus.includes(status);
}
