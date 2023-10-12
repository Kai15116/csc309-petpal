
// javascript for a better demo purpose.
const sortSelecter = document.querySelector("#sort-selector");
const sortOptions = document.querySelectorAll(".sort-option");
const loadingScreen = document.querySelector(".loader-container");
const loader = document.querySelector("#loader");
const sortFilterResult = document.querySelector("#sort-filter-result");
const filterForm = document.querySelector("#filter-form");

demo_list = [
  {
    img: "images/cat-image-1.jpg",
    breed: "America Bobtail",
    age: "1",
  },
  {
    img: "images/cat-image-2.jpg",
    breed: "Canada Bobtail",
    age: "13",
  },
  {
    img: "images/cat-image-3.jpg",
    breed: "China Bobtail",
    age: "2",
  },
  {
    img: "images/cat-image-1.jpg",
    breed: "Japan Bobtail",
    age: "9",
  },
  {
    img: "images/cat-image-2.jpg",
    breed: "America Bobtail",
    age: "8",
  },
  {
    img: "images/cat-image-3.jpg",
    breed: "America Bobtail",
    age: "3",
  },
  {
    img: "images/cat-image-1.jpg",
    breed: "America Bobtail",
    age: "8",
  },
  {
    img: "images/search-filter-images/cat-image-1.jpg",
    breed: "America Bobtail",
    age: "7",
  },
  {
    img: "images/search-filter-images/cat-image-1.jpg",
    breed: "America Bobtail",
    age: "9",
  },
  {
    img: "images/search-filter-images/cat-image-1.jpg",
    breed: "America Bobtail",
    age: "1",
  },
  {
    img: "images/search-filter-images/cat-image-1.jpg",
    breed: "America Bobtail",
    age: "5",
  },
  {
    img: "images/search-filter-images/cat-image-1.jpg",
    breed: "America Bobtail",
    age: "6",
  },
  {
    img: "images/search-filter-images/cat-image-1.jpg",
    breed: "America Bobtail",
    age: "2",
  },
];

function createDemoView(demo_list, demo_status) {
  const searchResultDiv = document.querySelector(
    "#search-result-container"
  );
  const paginationControl = document.querySelector("#pagination-control");
  paginationControl.classList.toggle("d-none");
  // Reference: https://getbootstrap.com/docs/5.3/components/card/
  const searchResHtml = demo_list
    .map(
      (item) => `
      <div class="col">
            <div class="card">
                <img src="${item.img}" style="height: 180px; object-fit: cover;" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Lalo</h5>
                  <p class="card-text">
                    breed: ${item.breed}
                    <br>
                    age: ${item.age} year
                    <br>
                    <a href="details.html" class="stretched-link">view details</a>
                  </p>
                </div>
                <div class="card-footer">
                  <small class="text-body-secondary">Last updated 3 mins ago</small>
                </div>
              </div>
          </div>
    `
    )
    .join("");
  // Reference: https://getbootstrap.com/docs/5.3/components/spinners/
  searchResultDiv.innerHTML = `<div class="d-flex align-items-center">
<strong role="status">Loading...</strong>
<div class="spinner-border ms-auto" aria-hidden="true"></div>
</div>`;
  // Reference: https://getbootstrap.com/docs/5.3/components/alerts/
  const sortResultSuccessHtml = `<div class="alert alert-success d-flex align-items-center" role="alert" >
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
        <div>
          <p class="p-0 m-0"><img class="pr-1" src="check2-circle.svg" alt="">
            We have prepared the result for "Sort By Age"</p>
        </div>
      </div>`;

  // const filterResultSuccessHtml = `<div class="alert alert-success d-flex align-items-center" role="alert">
  //   <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  //   <div>
  //     <p class="p-0 m-0"><img class="pr-1" src="check2-circle.svg" alt="">
  //       <span class="pr-1">
  //           Found <strong>2</strong> results with <strong class="text-primary">1 </strong>Filter</p>
  //   </div>
  // </div>`;

  // const filterResultFailureHtml = `<div class="alert alert-danger d-flex align-items-center" role="alert">
  //   <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  //   <div>
  //     <p class="p-0 m-0"><img class="pr-1" src="check2-circle.svg" alt="">
  //       Sorry, No Matching results with the filters above. Please try allow more general options.</p>
  //   </div>
  // </div>`;

  setTimeout(() => {
    paginationControl.classList.toggle("d-none");
    searchResultDiv.innerHTML = searchResHtml;
    if (demo_status === "sort_success") {
      sortFilterResult.innerHTML = sortResultSuccessHtml;
    }
    // else if (demo_status === "filter_success") {
    //   sortFilterResult.innerHTML = filterResultSuccessHtml;
    // } else if (demo_status === "filter_failure") {
    //   sortFilterResult.innerHTML = filterResultFailureHtml;
    // }
  }, 1200);
}
createDemoView(demo_list, "normal");

const sortByAgeDemoViewDESC = demo_list.sort((x, y) => y.age - x.age);
const sortByAgeDemoView = demo_list.sort((x, y) => x.age - y.age);

// console.log(sortOptions);
sortSelecter.addEventListener("change", () => {
  createDemoView(sortByAgeDemoView, "sort_success");
});
// sortOptions.forEach((elem) => {

//     elem.addEventListener('select', (e) => {
//         console.log(elem.value);
// if (e.currentTarget === elem) {

// console.log(`${e.currentTarget.value} has been selected`);
// sortSelecter.innerHTML = `Sort by ${elem.value}`;
// loader.classList.toggle('loader-customize-show');
// createDemoView(sortByAgeDemoView, "sort_success");
// }
//     })
// });
