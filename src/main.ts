import './style.css'
import { v4 } from 'uuid'
import 'toastify-js/src/toastify.css'
import Toastify from 'toastify-js'
//le puedo decir al queryselector que es lo que estoy agarrando para que me de autocompletado
const taskForm = document.querySelector<HTMLFormElement>("#taskForm");
const tasksList = document.querySelector<HTMLDivElement>("#tasksList");


interface Task {
  title: string,
  description: string,
  id: string
}

let tasks: Task[] = []

taskForm?.addEventListener('submit', e => {
  e.preventDefault()

  //convertime lo del taskForm['title'] primero a un tipo de dato que no conozco y luego a un htmlinput
  const title = taskForm['title'] as unknown as HTMLInputElement
  const description = taskForm['description'] as unknown as HTMLTextAreaElement

  tasks.push({
    title: title.value,
    description: description.value,
    id: v4()
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));

  Toastify({
    text: "Added task"
  }).showToast()

  renderTasks(tasks)

  taskForm.reset()

  title.focus()

})

document.addEventListener('DOMContentLoaded', () => {

  tasks = JSON.parse(localStorage.getItem('tasks') || '[]')

  renderTasks(tasks)

})


function renderTasks(tasks: Task[]) {

  tasksList!.innerHTML = ''

  tasks.forEach(task => {
    const taskElement = document.createElement('div')
    taskElement.className = 'bg-zinc-800 mb-1 rounded-lg hover:bg-zinc-600 hover:cursor-pointer p-4'

    const header = document.createElement('header')

    header.className = 'flex justify-between'

    const title = document.createElement('span')

    title.innerText = task.title

    const btnDelete = document.createElement('button')

    btnDelete.innerText = 'delete'

    btnDelete.className = 'bg-red-500 px-2 py-1 rounded-md'

    btnDelete.addEventListener('click', e => {
      const index = tasks.findIndex(t => t.id === task.id)
      tasks.splice(index, 1)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      renderTasks(tasks)
    })

    const description = document.createElement('p')

    description.innerText = task.description

    header.append(title)

    header.append(btnDelete)

    taskElement.append(header)

    taskElement.append(description)

    tasksList?.append(taskElement)

  })
}