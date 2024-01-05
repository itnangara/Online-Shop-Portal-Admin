<template>
    <div class="modal fade" id="exampleModal" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text">Department Name</span>
                        <input type="text" class="form-control" v-model="DepartmentName">
                    </div>

                    <button 
                    type="button" @click="createClick()"
                    v-if="DepartmentId==0"
                    style="background-color:#3d008d"
                    class="btn btn-primary">
                    Create
                    </button>

                    <button 
                    type="button" @click="updateClick()"
                    v-if="DepartmentId!=0"
                    style="background-color:#3d008d"
                    class="btn btn-primary">
                    Update
                    </button>              
                </div>
            </div>
        </div>
    </div>

    <side-bar></side-bar>

    <div class="main-panel" id="main-panel">

        <nav-bar></nav-bar>

        <base-card style="width:95%">
            <div>
                <button type="button"
                    class="btn btn-primary custom-btn"
                    style="background-color:#3d008d"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    @click="addClick()">
                    Add Department
                </button>

                <base-spinner style="margin:auto" v-if="isLoading"></base-spinner>

                <base-dialog :show="showLoadingErrorDialog" title="Error Occurred" @close="errorHandling">
                    <p class="error" v-if="loadingError">Failed loading due to: <strong>{{ loadingErrorMessage }}</strong></p>
                </base-dialog>

                <div>
                    <div style="margin-left:70%">
                        <input 
                            class="form-control m-2"
                            style="width:15rem;"
                            v-model="departmentIdFilter"
                            v-on:keyup="FilterFn()"
                            placeholder="Search  "
                        >
                    </div>
            
                    <table id="employee" class="table">
                        <thead>
                            <tr>
                                <th>#
                                    <button type="button" class="btn btn-light"
                                    @click="sortFn('DepartmentId',true)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                    </button>
            
                                    <button type="button" class="btn btn-light"
                                    @click="sortFn('DepartmentId',false)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                    </svg>
                                    </button>
                                </th>
            
                                <th>Department
                                    <button type="button" class="btn btn-light"
                                    @click="sortFn('DepartmentName', true)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                    </button>
            
                                    <button type="button" class="btn btn-light"
                                    @click="sortFn('DepartmentName',false)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                    </svg>
                                    </button>
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
            
                        <tbody>
                            <tr v-for="department in departments" :key="department.DepartmentId">
                                <td>{{ department.DepartmentId }}</td>
                                <td>{{ department.DepartmentName }}</td>
                                <td>
                                    <button type="button"
                                    class="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    @click="editClick(department)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>
                                    <button type="button" @click="deleteClick(department.DepartmentId)"
                                    class="btn btn-light mr-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
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
</template>

<script>
import axios from 'axios'
import 'datatables.net';
// import $ from 'jquery';

export default {
data() {
    return {
        API_URL: "http://127.0.0.1:8000/",
        PhotoPath: "http://127.0.0.1:8000/Photos/",
        // PHOTO_URL:"http://127.0.0.1:8008/Photos/",

        departments:[],
        departmentsWithoutFilter:[],

        DepartmentName:"",
        DepartmentId:0,

        departmentNameFilter:"",
        departmentIdFilter:"",

        modalTitle:"",

        isLoading: true,
        loadingError: false,
        loadingErrorMessage: null,
        showLoadingErrorDialog: false,
    }
},

mounted() {
    this.loadDepartments()
},

methods: {
  FilterFn(){
    var departmentIdFilter = this.departmentIdFilter;
    var departmentNameFilter = this.departmentNameFilter;
        
    this.departments = this.departmentsWithoutFilter.filter(
        function(pos){
            console.log('current position: ', pos.DepartmentId);

            let combinedFilter = departmentIdFilter.toString().trim().toLowerCase() 
            + departmentNameFilter.toString().trim().toLowerCase();
            
            return pos.DepartmentId.toString().toLowerCase().includes(combinedFilter)
            || pos.DepartmentName.toString().toLowerCase().includes(combinedFilter);
        }
    );
  },

  sortFn(prop, asc){
      this.departments = this.departmentsWithoutFilter.sort(function(a,b){
          if(asc){
              return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
          }
          else{
              return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
          }
      })
  },

  errorHandling(){
    this.showLoadingErrorDialog = false;
    this.loadingErrorMessage = null;
  },

  async loadDepartments(){
      try {
          let response = await axios.get(this.API_URL + "departments")
          
          console.log('my res: ', response.data);
          this.departments = response.data;     
          this.departmentsWithoutFilter = response.data;
          
          this.isLoading = false;
      } catch (error) {
            //alert(error.message)
            this.loadingError = true;
            this.loadingErrorMessage = error.message;
            this.showLoadingErrorDialog = true;
            
            this.isLoading = false;
      }
      //$('#employee').DataTable();
  },
  
  addClick(){
      console.log('welcome to add');
      
      this.modalTitle="Add Department";
      this.DepartmentId=0;
      this.DepartmentName="";
  },

  async createClick(){
      console.log('welcome to create click');
      try {
          let response = await axios.post(this.API_URL + "departments", {
            DepartmentName:this.DepartmentName,
          })

          if (response.status < 200 || response.status >= 300) {
              alert('error occurred');
              // return
          }
          
          this.loadDepartments();
      } 
      catch (error) {
          alert(error.message);
      }
  },
  
  editClick(dep){
      console.log('welcome to edit 1');
      
      this.modalTitle="Edit Employee";
      this.DepartmentId=dep.DepartmentId;
      this.DepartmentName=dep.DepartmentName;
  },

  async updateClick(){
      console.log('welcome to edit 2');
      try {
          let response = await axios.put(this.API_URL + "departments",{
              DepartmentId:this.DepartmentId,
              DepartmentName:this.DepartmentName,
          })
          
          if (response.status < 200 || response.status >= 300){
              alert('error occurred')
              // return
          }
          this.loadDepartments();
      } 
      catch (error) {
          alert(error.message);            
      }
  },

  async deleteClick(id){
      if(!confirm("Are you sure?")){
          return;
      }

      try {
          let response = await axios.delete(this.API_URL + "departments/" + id)

          this.loadDepartments();

          if(response.status < 200 || response.status>=300){
              alert('error occurred')
          }
      }
      catch (error) {
          alert(error.message);    
      }
  },
},

}
</script>

<style>
.custom-btn {
  float: left;
  margin-left:20px;
}
</style>