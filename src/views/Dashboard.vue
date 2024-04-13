<template>
  <div style="display: block">
    <div class="d-flex">
      <div class="small text-medium-emphasis me-3">Dashboard</div>
    </div>

    <main>
      <div class="recommended">
        <!-- base modal -->
        <div
          class="modal fade"
          id="uniModal"
          tabindex="-1"
          aria-labelledby="uniModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="uniModalLabel">
                  {{ modalTitle }}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  @click="closeModal()"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <base-card style="width: 95%; margin-top: 0px">
                  <div>
                    <div class="input-group mb-3">
                      <span class="input-group-text">Name</span>
                      <input
                        type="text"
                        class="form-control"
                        v-model="EmployeeName"
                      />
                    </div>

                    <div class="input-group mb-3">
                      <span class="input-group-text">Department</span>
                      <input
                        type="text"
                        class="form-control"
                        v-model="Department"
                      />
                    </div>

                    <div class="input-group mb-3">
                      <span class="input-group-text">Joning Date</span>
                      <input
                        type="date"
                        class="form-control"
                        v-model="DateOfJoining"
                      />
                    </div>

                    <div class="p-2 w-50 bd-highlight">
                      <input class="m-2" type="file" @change="imageUpload" />
                      <div>
                        <img
                          :src="PhotoPath + Image"
                          alt="Image"
                          class="employee-image"
                        />
                      </div>
                    </div>

                    <div style="float: right">
                      <base-button
                        type="button"
                        @click="createClick()"
                        v-if="EmployeeId == 0"
                        class="btn btn-primary"
                      >
                        Create
                      </base-button>

                      <base-button
                        type="button"
                        @click="updateClick()"
                        v-if="EmployeeId != 0"
                        class="btn btn-primary"
                      >
                        Update
                      </base-button>

                      <base-button
                        type="button"
                        @click="closeModal()"
                        style="margin-left: 10px"
                      >
                        Cancel
                      </base-button>
                    </div>
                  </div>
                </base-card>
              </div>
            </div>
          </div>
        </div>

        <!-- delete confirmation modal -->
        <div
          class="modal fade"
          id="deleteModal"
          tabindex="-1"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">
                  {{ modalTitle }}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  @click="closeModal()"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <base-card style="width: 95%; margin-top: 0px">
                  <div>
                    <div>
                      <p>Are you sure you want to delete</p>
                    </div>

                    <div style="float: right">
                      <base-button
                        type="button"
                        @click="confirmDelete()"
                        class="btn btn-primary"
                      >
                        Yes, delete
                      </base-button>

                      <base-button
                        type="button"
                        @click="closeModal()"
                        style="margin-left: 10px"
                      >
                        Cancel
                      </base-button>
                    </div>
                  </div>
                </base-card>
              </div>
            </div>
          </div>
        </div>

        <div class="main-panel" id="main-panel">
          <base-card style="width: 100%">
            <div>
              <button
                type="button"
                class="btn custom-btn"
                style="
                  margin-top: 30px;
                  background-color: var(--dashboardFooterBackground);
                  border-width: 3px;
                  border-color: green;
                  border-color: var(--dashboardFooterBackground);
                "
                @click="addClick()"
              >
                Add Admin
              </button>

              <base-spinner
                style="margin: auto"
                v-if="isLoading"
              ></base-spinner>

              <base-dialog
                :show="showLoadingErrorDialog"
                title="Error Occurred"
                @close="errorHandling"
              >
                <p class="error" v-if="loadingError">
                  Failed loading due to:
                  <strong>{{ loadingErrorMessage }}</strong> error
                </p>
              </base-dialog>

              <div>
                <div style="margin-left: 70%">
                  <input
                    class="form-control m-2"
                    style="width: 15rem"
                    v-model="employeeNameFilter"
                    v-on:keyup="FilterFn()"
                    placeholder="Search"
                  />
                </div>

                <table class="table">
                  <thead>
                    <tr>
                      <th>
                        #
                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('EmployeeId', true)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-down-square-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"
                            />
                          </svg>
                        </button>

                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('EmployeeId', false)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-up-square-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"
                            />
                          </svg>
                        </button>
                      </th>

                      <th>
                        Name
                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('EmployeeName', true)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-down-square-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"
                            />
                          </svg>
                        </button>

                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('EmployeeName', false)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-up-square-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"
                            />
                          </svg>
                        </button>
                      </th>

                      <th>
                        Department
                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('Department', true)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-down-square-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"
                            />
                          </svg>
                        </button>

                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('Department', false)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-up-square-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"
                            />
                          </svg>
                        </button>
                      </th>

                      <th>
                        Date Of Joining
                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('DateOfJoining', true)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-down-square-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"
                            />
                          </svg>
                        </button>

                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('DateOfJoining', false)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-up-square-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"
                            />
                          </svg>
                        </button>
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="employee in employees"
                      :key="employee.EmployeeId"
                    >
                      <td>{{ employee.EmployeeId }}</td>
                      <td>{{ employee.EmployeeName }}</td>
                      <td>{{ employee.Department }}</td>
                      <td>{{ employee.DateOfJoining }}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-light mr-1"
                          @click="editClick(employee)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          class="btn btn-light mr-1"
                          @click="deleteClick(employee.EmployeeId)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </base-card>
        </div>
      </div>
    </main>
    <CCardFooter class="dashboardpagecolor"></CCardFooter>
  </div>
</template>

<script>
// import avatar from '@/assets/images/avatars/avatar.png'
import axios from 'axios'
import 'datatables.net'
import * as bootstrap from 'bootstrap'
// import $ from 'jquery'

export default {
  name: 'Dashboard',
  data() {
    return {
      drawer: true,
      group: null,
      API_URL: 'http://127.0.0.1:8000/',
      PhotoPath: '',
      // ddd:JSON.parse(JSON.stringify(response.data)),

      employeesWithoutFilter: [],
      employees: [],

      employeeIdFilter: '',
      employeeNameFilter: '',
      employeeDepartmentFilter: '',
      dateOfJoiningFilter: '',
      departmentNameFilter: '',

      modalTitle: '',
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      Image: 'default_image.png',
      modal: '',
      //vvv: this.Image,

      isLoading: true,
      loadingError: false,
      loadingErrorMessage: null,
      showLoadingErrorDialog: false,

      selectedId: null,
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
  mounted() {
    console.log("emp id: ", this.EmployeeId)
    this.initializeProperties()
    this.loadEmployees()
  },

  methods: {
    openModal(modalName) {
      console.log("emp id: ", this.EmployeeId)

      this.modal = new bootstrap.Modal(document.getElementById(modalName))
      this.modal.show()
    },
    closeModal() {
      this.resetProperties()
      this.modal.hide()
    },
    initializeProperties() {
      this.PhotoPath = this.API_URL + 'static/'
    },
    resetProperties() {
      this.modalTitle = 'Add Employee'
      this.EmployeeId = 0
      this.EmployeeName = ''
      this.Department = ''
      this.DateOfJoining = ''
      this.Image = 'default_image.png'
    },
    FilterFn() {
      var employeeIdFilter = this.employeeIdFilter
      var employeeNameFilter = this.employeeNameFilter
      var employeeDepartmentFilter = this.employeeDepartmentFilter

      this.employees = this.employeesWithoutFilter.filter(function (pos) {
        console.log('current position: ', pos.EmployeeId)

        let combinedFilter =
          employeeIdFilter.toString().trim().toLowerCase() +
          employeeNameFilter.toString().trim().toLowerCase() +
          employeeDepartmentFilter.toString().trim().toLowerCase()

        return (
          pos.EmployeeId.toString().toLowerCase().includes(combinedFilter) ||
          pos.EmployeeName.toString().toLowerCase().includes(combinedFilter) ||
          pos.Department.toString().toLowerCase().includes(combinedFilter)
        )
      })
    },

    sortFn(prop, asc) {
      this.employees = this.employeesWithoutFilter.sort(function (a, b) {
        if (asc) {
          return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0
        } else {
          return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0
        }
      })
    },

    errorHandling() {
      this.showLoadingErrorDialog = false
      this.loadingErrorMessage = null
    },

    async loadEmployees() {
      try {
        let response = await axios.get(this.API_URL + 'employees')

        this.isLoading = false
        console.log('isaac res: ', response.data)

        this.employees = response.data
        this.employeesWithoutFilter = response.data
      } catch (error) {
        // alert(error.message)
        this.loadingError = true
        this.loadingErrorMessage = error.message
        this.showLoadingErrorDialog = true

        this.isLoading = false
      }
    },

    addClick() {
      this.resetProperties()
      this.openModal('uniModal')
    },

    async createClick() {
      try {
        if (!this.DateOfJoining) {
          const date = new Date()
          this.DateOfJoining = date.toISOString().split('T')[0]
        }
        let response = await axios.post(this.API_URL + 'employees', {
          EmployeeName: this.EmployeeName,
          Department: this.Department,
          DateOfJoining: this.DateOfJoining,
          Image: this.Image,
        })

        if (response.status < 200 || response.status >= 300) {
          alert('error occurred')
        }
      } catch (error) {
        alert(error.message)
      }
      this.closeModal()
      this.loadEmployees()
    },

    editClick(emp) {
      this.openModal('uniModal')
      this.modalTitle = 'Edit Employee'
      this.EmployeeId = emp.EmployeeId
      this.EmployeeName = emp.EmployeeName
      this.Department = emp.Department
      this.DateOfJoining = emp.DateOfJoining
      this.Image = emp.Image
      console.log('my image: ', this.Image)
    },

    async updateClick() {
      console.log('welcome to edit 2')
      try {
        let response = await axios.put(this.API_URL + 'employees', {
          EmployeeId: this.EmployeeId,
          EmployeeName: this.EmployeeName,
          Department: this.Department,
          DateOfJoining: this.DateOfJoining,
          Image: this.Image,
        })
        
        if (response.status < 200 || response.status >= 300) {
          alert('error occurred')
          // return
        }
      } catch (error) {
        alert(error.message)
      }
      this.closeModal()
      this.loadEmployees()
    },

    deleteClick(id) {
      this.openModal('deleteModal')
      this.modalTitle = 'Delete Employee'

      console.log('id: ', id)
      this.selectedId = id
    },

    async confirmDelete() {
      let id = this.selectedId
      try {
        let response = await axios.delete(this.API_URL + 'employees/' + id)
        this.selectedId = null
        if (response.status < 200 || response.status >= 300) {
          alert('error occurred')
        }
      } catch (error) {
        alert(error.message)
      }      
      this.closeModal()
      this.loadEmployees()
    },

    async imageUpload(event) {
      let file_name = event.target.files[0].name
      this.Image = file_name // updating the current modal instance name once there is a change

      let formData = new FormData()
      formData.append('file', event.target.files[0]) // sending the whole file

      try {
        let response = await axios.post(
          this.API_URL + 'employees/savefile',
          formData,
        )
        this.Image = response.data // if error occurs this is skipped, image will remain pointing instance in modal
      } catch (error) {
        console.log('Error: ', error)
      }
    },

    // async imageUpload(event) {
    //   console.log('file: ', event.target.files[0])

    //   let formData = new FormData()
    //   formData.append('file', event.target.files[0])

    //   let response = await axios.post(
    //     this.API_URL + 'employees/savefile',
    //     formData,
    //   )
    //   this.Image = response.data
    // },
  },
}
</script>

<style scoped>
.employee-image {
  width: auto; /* Set the desired width */
  height: 250px; /* Maintain aspect ratio */
}
.form-control-- {
  border-width: 1px;
  border-color: var(--dashboardFooterBackground);
  border-color: grey;
}
.form-control:focus {
  border-color: var(--dashboardFooterBackground);
  box-shadow: 0 0 0 0.13rem var(--dashboardFooterBackground);
}
.recommended {
  display: block;
}
.dashboardpagecolor {
  background-color: var(--dashboardFooterBackground);
  margin-bottom: 30px;
}
</style>
