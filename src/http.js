const c = console.log.bind(console);
class EasyHttp{
  async get(url){
    const response = await fetch(url)
   
    return response.json()

  }

  async post(url, data){
    const response = await fetch(url,{
      method:'POST',
      mode: "cors", 
      cache: "no-cache",
      credentials: "same-origin",
      headers:{
        'Content-Type':'application/json'
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })

    return response.json()
  }

  async put(url, data){
    const response = await fetch(url,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })

    return response.json()
  }

  async delete(url){
    const response = await fetch(url,{
      headers:{
        'Content-Type':'application/json'
      },
      method:'DELETE',
    })
    return response.json()
  }
}
 
export const http = new EasyHttp();