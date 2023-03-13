const c = console.log.bind(console)
import { http } from "./http"
import { ui } from "./ui"

// Get posts on DOM load

document.addEventListener('DOMContentLoaded', getPosts)
function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data=>{
    ui.showPosts(data)
  })
  .catch(err=>console.log(err))
}

// listen for add post
document.querySelector('.post-submit').addEventListener('click', ()=>{submitPost()});
function submitPost(){
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value
  const id = document.querySelector('#id').value
  if(title !== '' || body !== ''){
    const payload = {
      title:title,
      body:body,
    }
    // if in edit state
    if(document.querySelector('.post-submit').classList.contains('btn-warning')){
      http.put(`http://localhost:3000/posts/${id}`, payload)
      .then(data=> {
        ui.showAlert('Post Updated', 'alert alert-success')
        ui.changeFormState('add')
        getPosts()
      })
      .catch(e=>{console.log(e)})
      // if in default submit state
    } else{
      http.post('http://localhost:3000/posts', payload)
      .then(data=> {
        ui.showAlert('Post Added', 'alert alert-success')
        ui.clearFields()
        getPosts()
     
      })
      .catch(e=>{console.log(e)})
    }
  } else{
    ui.showAlert('Form cannot be empty', 'alert alert-danger')
  }
}
 

// listen for delete
document.querySelector('#posts').addEventListener('click', delPost)
function delPost(e){
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id
   
    if(confirm('Are you sure')){
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(()=>{
        ui.showAlert('Post Deleted', 'alert alert-success');
        getPosts()
      })
      .catch(e=>{
        console.log(e);
      })
    }
    e.preventDefault()
  }
  
}

// liten for edit
document.querySelector('#posts').addEventListener('click', editPost)

function editPost(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id
    http.get(`http://localhost:3000/posts/${id}`)
    .then(data=>{
      ui.fillForm(data)
    })
    .catch(err=>{console.log(err);})
    e.preventDefault()
  }
}
// listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEditState)
function cancelEditState(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormState('add')
   
  }
  e.preventDefault()
}

