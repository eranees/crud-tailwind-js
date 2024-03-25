const form = document.getElementById("form")
const tbody = document.getElementById("tbody")
const save = document.getElementById("save")

let users = loadFromLocalStorage() === null ? [] : loadFromLocalStorage()

function displayUsers() {
  if (users != null && users.length > 0) {
    tbody.innerHTML = ""
    users.forEach((user) => {
      tbody.innerHTML += `
    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        ${user.id}
      </th>
      <td class="px-6 py-4">
        ${user.name}
      </td>
      <td class="px-6 py-4">
        ${user.username}
      </td>
      <td class="px-6 py-4">
        ${user.email}
      </td>
      <td class="px-6 py-4">
        ${getStatusIcon(user.status)}
      </td>
      <td class="px-6 py-4">
        <i class="bi bi-trash cursor-pointer text-red-600" onclick="deleteUser(${user.id})"></i>
        <i class="bi bi-pencil-square px-3 cursor-pointer text-sky-500" onclick="updateUser(${user.id})"></i>
      </td>
    </tr>
  `
    })
  } else {
    tbody.innerHTML = `
    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" colspan="6">
        Users list is empty
      </th>
    </tr>`
  }
}

displayUsers()

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const userObject = Object.fromEntries(new FormData(form))
  if (userObject.id > 0) {
    users.forEach((user) => {
      if (user.id == userObject.id) {
        user.id = userObject.id
        user.name = userObject.name
        user.username = userObject.username
        user.email = userObject.email
        user.status = userObject.status === undefined ? false : true
      }
    })
    document.getElementById("id").value = -1
  } else {
    userObject.status = userObject.status === undefined ? false : true
    userObject.id = users == null ? 1 : users.length + 1
    users.push(userObject)

  }
  form.reset();
  save.innerHTML = "Save"
  saveToLocalStorage()
  displayUsers()
})

function updateUser(id) {
  save.innerHTML = "Update"
  users.forEach((user) => {
    if (user.id == id) {
      document.getElementById("id").value = user.id
      document.getElementById("name").value = user.name
      document.getElementById("username").value = user.username
      document.getElementById("email").value = user.email
      if (user.status) {
        document.getElementById("status").checked = true
      } else {
        document.getElementById("status").checked = false
      }
    }
  })
}

function deleteUser(id) {
  users = users.filter((user) => user.id != id)
  saveToLocalStorage()
  displayUsers()
}

function getStatusIcon(status) {
  if (status === true) {
    return '<i class="bi bi-check2-circle text-green-500"></i>';
  } else {
    return '<i class="bi bi-x-circle text-red-600"></i>';
  }
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem("users"))
}

function saveToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users))
}