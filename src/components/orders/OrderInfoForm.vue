<template>
  <div>
    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="col-12">
          <nav class="breadcrumb bg-light mb-30">
            <span class="breadcrumb-item active p-1">주문 조회</span>
          </nav>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="py-3">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Order Status
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="#">Ready</a>
              <a class="dropdown-item" href="#">Order</a>
              <a class="dropdown-item" href="#">Cancel</a>
            </div>
          </div>
          <input type="date" id="startDate" class="text-dark" />
          ~
          <input type="date" id="endDate" class="" />
        </div>
        <div class="table-responsive mb-5">
          <table
            class="table table-light table-borderless table-hover text-center mb-0"
          >
            <thead class="thead-dark">
              <tr>
                <th>Date</th>
                <th>Products</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody class="align-middle">
              <tr>
                <td class="align-middle">2022.10.24</td>
                <td class="align-middle">
                  <img
                    src="../../assets/products/1_cat.jpg"
                    alt=""
                    style="width: 50px"
                  />
                  Product Name
                </td>

                <td class="align-middle">1</td>
                <td class="align-middle">$150</td>
                <td class="align-middle">주문 완료</td>
              </tr>
              <tr>
                <td class="align-middle">2022.10.24</td>

                <td class="align-middle">
                  <img
                    src="../../assets/products/1_cat.jpg"
                    alt=""
                    style="width: 50px"
                  />
                  Product Name
                </td>
                <td class="align-middle">1024</td>
                <td class="align-middle">$150</td>
                <td class="align-middle">주문 완료</td>
              </tr>
              <tr>
                <td class="align-middle">2022.10.24</td>
                <td class="align-middle">
                  <img
                    src="../../assets/products/1_cat.jpg"
                    alt=""
                    style="width: 50px"
                  />
                  Product Name
                </td>
                <td class="align-middle">1024</td>
                <td class="align-middle">$150</td>
                <td class="align-middle">주문 완료</td>
              </tr>
              <tr>
                <td class="align-middle">2022.10.24</td>
                <td class="align-middle">
                  <img
                    src="../../assets/products/1_cat.jpg"
                    alt=""
                    style="width: 50px"
                  />
                  Product Name
                </td>
                <td class="align-middle">1024</td>
                <td class="align-middle">$150</td>
                <td class="align-middle">주문 완료</td>
              </tr>
              <tr>
                <td class="align-middle">2022.10.24</td>
                <td class="align-middle">
                  <img
                    src="../../assets/products/1_cat.jpg"
                    alt=""
                    style="width: 50px"
                  />
                  Product Name
                </td>
                <td class="align-middle">1024</td>
                <td class="align-middle">$150</td>
                <td class="align-middle">주문 완료</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-12">
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#">Previous</a>
          </li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item">
            <a class="page-link text-primary2" href="#">2</a>
          </li>
          <li class="page-item">
            <a class="page-link text-primary2" href="#">3</a>
          </li>
          <li class="page-item">
            <a class="page-link text-primary2" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style></style>
