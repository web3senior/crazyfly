/**
 * Get Tour
 * @returns 
 */
export async function getTour() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}tour`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function getCategory() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}category`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function getFood() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}food`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}
/**
 * Login
 * @param {json} post 
 * @returns 
 */
export async function newRecord(post) {
  var requestOptions = {
    method: 'POST',
    body: JSON.stringify(post),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}newRecord`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function getLeaderboard() {
  var myHeaders = new Headers()

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}leaderboard`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function updateProfile(data) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${getAccessToken()}`)
  myHeaders.append('Content-Type', 'application/json')

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}profile/update`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function getAddress() {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${getAccessToken()}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}address/get`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function addAddress(data) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${getAccessToken()}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}address/add`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function updateAddress(data, id) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${getAccessToken()}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}address/update?id=${id}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function deleteAddress(id) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${getAccessToken()}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}address/delete?id=${id}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function getCartype() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}cartype`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function getCar() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}car`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function addRequest(submission) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${getAccessToken()}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(submission),
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}request/add`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}
//--------------------------------------
//--------------------------------------

export async function delLayer(id) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}delLayer/${id}`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }
  return response.json()
}

export async function delProceeding(id) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}delProceeding/${id}`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }
  return response.json()
}

export async function deleteCategory(id) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}deleteCategory/${id}`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }
  return response.json()
}

export async function getHeader() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}header`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }
  return response.json()
}

export async function getAllCategory() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}allCategory`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }
  return response.json()
}

export async function saveLayer(data) {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify(data)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}saveLayer`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }

  return response.json()
}

export async function newCategory(data) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var raw = JSON.stringify(data)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}newCategory`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }

  return response.json()
}

export async function saveFormContent(selectedIDs, content) {
  var requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      ids: selectedIDs,
      form_content: content,
    }),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}saveFormContent`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to provinces', { status: 500 })
  }
  return response.json()
}

export async function getTile() {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}tile`)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }
  return response.json()
}



export async function dateTime(dt) {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}dateTime/${dt}`)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }
  return response.json()
}

export async function now() {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}now`)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }
  return response.json()
}

export async function user() {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('AccessToken')}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}user`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

/**
 * Dashboard
 * @returns array
 */
export async function getDashboard() {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}dashboard`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

/**
 * Dashboard
 * @returns array
 */
export async function getRequestType() {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}requestType`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

/**
 * Request Detail
 * @param {number} id
 * @returns object
 */
export async function getRequestDetail(id) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}requestDetail/${id}`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function getRequestCommissionDetail(id) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}requestCommissionDetail/${id}`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function getConfirmation(ids, token) {
  var myHeaders = new Headers()

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}requestDetailConfirmation/${ids}/${token}`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })

  return response.json()
}

export async function getPrintData() {
  let response = await fetch(`${import.meta.env.VITE_BASE_URL}printData`)
  if (!response.ok) throw new Response('Failed to fetch links', { status: 500 })
  return response.json()
}
export async function sendSms(numbers, content) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  const response = await fetch(`https://api.ardabilman.ir/p_v1/sendSms?numbers=${numbers}&content=${content}`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })

  return response.json()
}

/**
 * Dashboard
 * @returns array
 */
export async function getRequest(page, searchQuery) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(searchQuery),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}request?page=${page}`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function getFilteredRequest(requestList) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      request_list: requestList,
    }),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}requestFiltered`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function getFinalProceedings(id) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: '',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}final_proceedings/${id}`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })

  return response.json()
}

export async function getProceedings(page, searchQuery) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(searchQuery),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}proceedings?page=${page}`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function requestSignatureSave(commission_id, request_id) {
  var myHeaders = new Headers()
  //  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      request_id: request_id,
      commission_id: commission_id,
    }),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}requestSignatureSave`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}
export async function getRequestCommission() {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}getRequestCommission`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function getReportAllRequest(dataSet) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(dataSet),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}reportAllRequest`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function getReport() {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}report`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

/**
 * Dashboard
 * @returns array
 */
export async function getCommission(page) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}commission?page=${page}`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function getCommissionAll() {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}commissionAll`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function getLayer(page, searchQuery) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(searchQuery),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}layer?page=${page}`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function updateLayer(data, id) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}updateLayer/${id}`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function updateRequestFormContent(id, val) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(val),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}updateRequestFormContent/${id}`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function getAllLayer() {
  let myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}allLayer`, requestOptions)
  if (!response.ok) throw new Response('Failed to ', { status: 500 })
  return response.json()
}

export async function setRequestStatus(id, val) {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify({
    id: id,
    val: val,
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}requestStatus`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }

  return response.json()
}

export async function requestCategory(id, val) {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify({
    id: id,
    val: val,
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}requestCategory`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }

  return response.json()
}

export async function setRequestFormContent(data) {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var raw = JSON.stringify(data)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}requestFormContent`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }

  return response.json()
}

export async function setProceeding(data, id) {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var raw = JSON.stringify(data)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}updateProceeding/${id}`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }

  return response.json()
}

export async function newProceeding(data) {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token').slice(1, localStorage.getItem('token').length - 1)}`)

  var raw = JSON.stringify(data)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}newProceeding`, requestOptions)
  if (!response.ok) {
    throw new Response('Failed to ', { status: 500 })
  }

  return response.json()
}
