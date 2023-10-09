
// javascript for a better demo purpose.
const sortSelecter = document.querySelector("#sort-selector");
const sortOptions = document.querySelectorAll('.sort-option');
const loadingScreen = document.querySelector(".loader-container");
const loader = document.querySelector("#loader");
const sortFilterResult = document.querySelector('#sort-filter-result');
const filterForm = document.querySelector('#filter-form');

demo_list = [
  {img: "images/search-filter-images/cat-image-1.jpg", breed: "America Bobtail", age: "5 month"},
  {img: "images/cat-image-2.jpg", breed: "Canada Bobtail", age: "7 month"},
,
]

function createDemoView(demo_list, demo_status){
  const searchResultDiv = document.querySelector("#search-result-container");
  const paginationControl = document.querySelector("#pagination-control");
  paginationControl.classList.toggle('d-none');
  const searchResHtml = demo_list.map((item) => `
  <div class="col">
        <div class="card">
            <img src="${item.img}" style="height: 180px; object-fit: cover;" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Lalo</h5>
              <p class="card-text">
                breed: ${item.breed}
                <br>
                age: ${item.age} 
                <br>
                <a href="details.html" class="stretched-link">view details</a>
              </p>
            </div>
            <div class="card-footer">
              <small class="text-body-secondary">Last updated 3 mins ago</small>
            </div>
          </div>
      </div>
`).join("");
  searchResultDiv.innerHTML = `<div class="d-flex align-items-center">
<strong role="status">Loading...</strong>
<div class="spinner-border ms-auto" aria-hidden="true"></div>
</div>`;

  const sortResultSuccessHtml = `<div class="alert alert-success d-flex align-items-center" role="alert" >
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
    <div>
      <p class="p-0 m-0"><img class="pr-1" src="check2-circle.svg" alt="">
        We have prepared the result for "Sort By Age"</p>
    </div>
  </div>`;


  setTimeout(() => {
    paginationControl.classList.toggle('d-none');
    searchResultDiv.innerHTML = searchResHtml;
    if (demo_status === "sort_success") {
      sortFilterResult.innerHTML = sortResultSuccessHtml;
    } 

  }, 1200);
    };
    createDemoView(demo_list, "normal");

const sortByAgeDemoViewDESC = demo_list.sort((x, y) => y.age - x.age);
const sortByAgeDemoView = demo_list.sort((x, y) => x.age - y.age);


sortSelecter.addEventListener('change', () => {
  createDemoView(sortByAgeDemoView, "sort_success");
});

