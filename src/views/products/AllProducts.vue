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
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {{ modalTitle }}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <base-card style="width: 95%; margin-top: 0px">
                  <div>
                    <div class="input-group mb-3">
                      <span class="input-group-text">Product Name</span>
                      <input
                        type="text"
                        class="form-control"
                        v-model="product_name"
                      />
                    </div>

                    <div class="input-group mb-3">
                      <span class="input-group-text">Description</span>
                      <input
                        type="text"
                        class="form-control"
                        v-model="description"
                      />
                    </div>

                    <div class="input-group mb-3">
                      <span class="input-group-text">Category</span>
                      <input
                        type="text"
                        class="form-control"
                        v-model="category"
                      />
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text">SKU</span>
                      <input type="text" class="form-control" v-model="sku" />
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text">Price</span>
                      <input type="text" class="form-control" v-model="price" />
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text">Date Created</span>
                      <input
                        type="date"
                        class="form-control"
                        v-model="created_at"
                      />
                    </div>
                    <div class="input-group mb-3">
                      <span class="input-group-text">Inventory</span>
                      <input
                        type="text"
                        class="form-control"
                        v-model="inventory"
                      />
                    </div>

                    <div class="p-2 w-50 bd-highlight">
                      <img
                        width="250px"
                        height="250px"
                        :src="PhotoPath + image"
                      />
                      <input class="m-2" type="file" @change="imageUpload" />
                    </div>

                    <div style="float: right">
                      <base-button
                        type="button"
                        @click="createClick()"
                        v-if="product_id == 0"
                        class="btn btn-primary"
                      >
                        Create
                      </base-button>

                      <base-button
                        type="button"
                        @click="updateClick()"
                        v-if="product_id != 0"
                        class="btn btn-primary"
                      >
                        Update
                      </base-button>

                      <base-button
                        type="button"
                        data-bs-dismiss="modal"
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
                  data-bs-dismiss="modal"
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
                        v-if="product_id == 0"
                        class="btn btn-primary"
                      >
                        Yes, delete
                      </base-button>

                      <base-button
                        type="button"
                        data-bs-dismiss="modal"
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

        <side-bar></side-bar>

        <div class="main-panel" id="main-panel">
          <nav-bar></nav-bar>

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
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                @click="addClick()"
              >
                Add Product
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
                    v-model="productNameFilter"
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
                          @click="sortFn('product_id', true)"
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
                          @click="sortFn('product_id', false)"
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
                          @click="sortFn('product_name', true)"
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
                          @click="sortFn('product_name', false)"
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
                        Description
                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('description', true)"
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
                          @click="sortFn('description', false)"
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
                        Category
                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('category', true)"
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
                          @click="sortFn('category', false)"
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
                        SKU
                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('sku', true)"
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
                          @click="sortFn('sku', false)"
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
                        Price
                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('price', true)"
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
                          @click="sortFn('price', false)"
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
                        Date Created
                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('created_at', true)"
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
                          @click="sortFn('created_at', false)"
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
                        Inventory
                        <button
                          type="button"
                          class="btn btn-light"
                          @click="sortFn('inventory', true)"
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
                          @click="sortFn('inventory', false)"
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
                    <tr v-for="product in products" :key="product.product_id">
                      <td>{{ product.product_id }}</td>
                      <td>{{ product.product_name }}</td>
                      <td>{{ product.description }}</td>
                      <td>{{ product.category }}</td>
                      <td>{{ product.sku }}</td>
                      <td>{{ product.price }}</td>
                      <td>{{ product.created_at }}</td>
                      <td>{{ product.inventory }}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-light mr-1"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          @click="editClick(product)"
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
                          @click="deleteClick(product.product_id)"
                          class="btn btn-light mr-1"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
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
import $ from 'jquery'

export default {
  name: 'Dashboard',
  data() {
    return {
      drawer: true,
      group: null,

      API_URL: 'http://127.0.0.1:8000/',
      PhotoPath: 'http://127.0.0.1:8000/Photos/',
      // PHOTO_URL:"http://127.0.0.1:8008/Photos/",

      // ddd:JSON.parse(JSON.stringify(response.data)),

      productsWithoutFilter: [],
      products: [],

      productIdFilter: '',
      productNameFilter: '',
      productDepartmentFilter: '',
      dateOfJoiningFilter: '',
      departmentNameFilter: '',

      modalTitle: '',
      product_id: 0,
      product_name: '',
      description: '',
      category: '',
      sku: '',
      price: '',
      created_at: '',
      inventory: '',
      image: 'default_image.png',

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
    this.loadProducts()
  },

  methods: {
    FilterFn() {
      var productIdFilter = this.productIdFilter
      var productNameFilter = this.productNameFilter
      var productDepartmentFilter = this.productDepartmentFilter

      this.products = this.productsWithoutFilter.filter(function (pos) {
        console.log('current position: ', pos.product_id)

        let combinedFilter =
          productIdFilter.toString().trim().toLowerCase() +
          productNameFilter.toString().trim().toLowerCase() +
          productDepartmentFilter.toString().trim().toLowerCase()

        return (
          pos.product_id.toString().toLowerCase().includes(combinedFilter) ||
          pos.ProductName.toString().toLowerCase().includes(combinedFilter) ||
          pos.Department.toString().toLowerCase().includes(combinedFilter)
        )
      })
    },

    sortFn(prop, asc) {
      this.products = this.productsWithoutFilter.sort(function (a, b) {
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

    async loadProducts() {
      try {
        let response = await axios.get(this.API_URL + 'products')

        this.isLoading = false
        console.log('isaac res: ', response.data)

        this.products = response.data
        this.productsWithoutFilter = response.data
      } catch (error) {
        // alert(error.message)
        this.loadingError = true
        this.loadingErrorMessage = error.message
        this.showLoadingErrorDialog = true

        this.isLoading = false
      }

      $('#product').DataTable()
    },

    addClick() {
      console.log('welcome to add')
      this.modalTitle = 'Add Product'
      this.product_id = 0
      this.product_name = ''
      this.description = ''
      this.category = ''
      this.sku = ''
      this.price = ''
      this.created_at = ''
      this.image = 'default_image.png'
      this.inventory = ''
    },

    async createClick() {
      console.log('welcome to create click')
      //   console.log('Modal data: ', {
      //     product_name: this.product_name,
      //     description: this.description,
      //     category: this.category,
      //     sku: this.sku,
      //     price: this.price,
      //     created_at: this.created_at,
      //     image: this.image,
      //     inventory: this.inventory,
      //   })

      try {
        let response = await axios.post(this.API_URL + 'products', {
          product_name: this.product_name,
          description: this.description,
          category: this.category,
          sku: this.sku,
          price: this.price,
          created_at: this.created_at,
          image: this.image,
          inventory: this.inventory,
        })

        if (response.status < 200 || response.status >= 300) {
          alert('error occurred')
          // return
        }
      } catch (error) {
        alert(error.message)
      }
      this.loadProducts()
    },

    editClick(emp) {
      console.log('welcome to edit 1')

      this.modalTitle = 'Edit Product'
      this.product_id = emp.product_id
      this.product_name = emp.product_name
      this.description = emp.description
      this.category = emp.category
      this.sku = emp.sku
      this.price = emp.price
      this.created_at = emp.created_at
      this.image = emp.image
      this.inventory = emp.inventory
    },

    async updateClick() {
      console.log('welcome to edit 2')
      try {
        let response = await axios.put(this.API_URL + 'products', {
          product_id: this.product_id,
          product_name: this.product_name,
          description: this.description,
          category: this.category,
          sku: this.sku,
          price: this.price,
          created_at: this.created_at,
          inventory: this.inventory,
          image: this.image,
        })

        if (response.status < 200 || response.status >= 300) {
          alert('error occurred')
          // return
        }
        this.loadProducts()
      } catch (error) {
        alert(error.message)
      }
    },

    deleteClick(id) {
      console.log('id: ', id)
      this.selectedId = id
    },

    async confirmDelete() {
      let id = this.selectedId
      try {
        let response = await axios.delete(this.API_URL + 'products/' + id)

        this.loadProducts()
        this.selectedId = null

        if (response.status < 200 || response.status >= 300) {
          alert('error occurred')
        }
      } catch (error) {
        alert(error.message)
      }

      this.$router.push('/products/men')
    },

    async imageUpload(event) {
      console.log('file: ', event.target.files[0])

      let formData = new FormData()
      formData.append('file', event.target.files[0])

      let response = await axios.post(
        this.API_URL + 'products/savefile',
        formData,
      )
      this.image = response.data
    },
  },
}
</script>

<style scoped>
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
