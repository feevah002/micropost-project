const c = console.log.bind(console)
class UI{
  constructor(){
    this.post = document.querySelector('#posts')
    this.titleInput = document.querySelector('#title')
    this.bodyInput = document.querySelector('#body')
    this.idInput = document.querySelector('#id')
    this.postSubmit = document.querySelector('.post-submit')
    this.forState = `add`;
  }
  showPosts(posts) {
    let output = ''
    posts.forEach(post => {
      output +=`
        <div class="card mb-3">
          <div class='card-body'>
            <h4 class='card-title'>${post.title}</h4>
            <p class='card-text'>${post.body}</p>

            <a  class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a class="delete card-link" data-id="${post.id}">
              <i  class="fa fa-remove"></i>
            </a>
            
          </div>
        </div>
      `;
    });
    this.post.innerHTML = output
  }
  showAlert(message, className){
    this.clearAlert()
    // create a div
    const div  = document.createElement('div')
    // add classses
    div.className = className
    // add text 
    div.appendChild(document.createTextNode(message))
    // get parent 
    const container = document.querySelector('.postsContainer');
    // get posts 
    container.insertBefore(div, this.post)
    setTimeout(()=>{
      this.clearAlert()
    },3000)
  }
  clearAlert(){
    const currentAlert = document.querySelector('.alert')
    if(currentAlert){
      currentAlert.remove()
    }
  }
  clearFields(){
    this.titleInput.value =''
    this.bodyInput.value =''
  }
  fillForm(data){  
    this.titleInput.value =data.title
    this.bodyInput.value =data.body
    this.idInput.value = data.id
    this.changeFormState('edit')
  }

  changeFormState(type){
    if(type === 'edit'){
      this.postSubmit.textContent = 'Update Post'
      this.postSubmit.classList.remove('btn-primary')
      this.postSubmit.classList.add('btn-warning')
      // create cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block mt-2'
      button.appendChild(document.createTextNode('Cancel edit'))
      // get element to insert before
      const fromEnd = document.querySelector('.form-end')
      // get parent
      document.querySelector('.card-form').insertBefore(button, fromEnd)
    } else{
      this.titleInput.value ='' 
      this.idInput.value =''
      this.bodyInput.value =''
      this.postSubmit.classList.add('btn-primary')
      this.postSubmit.classList.remove('btn-warning')
      this.postSubmit.textContent = 'Submit'
      if(document.querySelector('.post-cancel')){
        document.querySelector('.post-cancel').remove()
      }
    }
  }
}

export const ui = new UI()