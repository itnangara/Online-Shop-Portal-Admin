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
                  <base-card style="width:95%; margin-top:0px">
                    <div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Name</span>
                            <input type="text" class="form-control" v-model="EmployeeName">
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text">Department</span>
                            <input type="text" class="form-control" v-model="Department">
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text">Joning Date</span>
                            <input type="date" class="form-control" v-model="DateOfJoining">
                        </div>
            
                        <div class="p-2 w-50 bd-highlight">
                            <img width="250px" height="250px"
                                :src="PhotoPath+PhotoFileName"/>
                            <input class="m-2" type="file" @change="imageUpload">
                        </div>
                        
                        <div style="float:right;">
                          
                          <base-button
                          type="button" 
                          @click="createClick()"
                          v-if="EmployeeId==0" class="btn btn-primary"
                          >
                          Create
                          </base-button>
                          
                          <base-button type="button" @click="updateClick()"
                              v-if="EmployeeId!=0" class="btn btn-primary"
                          >
                          Update
                          </base-button>

                          <base-button
                              type="button"
                              data-bs-dismiss="modal"
                              style="margin-left: 10px;"
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
</template>