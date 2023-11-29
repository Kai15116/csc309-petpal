import Pagination from "react-bootstrap/Pagination";

// Note: we created this in CSC301 project. so the logic is same.
function getPaginationItems(pagesCount, page) {
  // When the Page has less than or equal to 8 pages.
  if (pagesCount <= 8) {
    let smallPaginationItems = [];
    for (let i = 1; i <= pagesCount; i++) {
      smallPaginationItems.push(i);
    }
    return smallPaginationItems;
  }
  // If there are more than 8 pages.
  let leftBound = Math.max(page - 1, 1);
  let rightBound = Math.min(page + 1, pagesCount);

  if (leftBound <= 2 && rightBound < pagesCount - 2) {
    let leftPaginationItems = [];
    for (let i = 1; i <= 5; i++) {
      leftPaginationItems.push(i);
    }
    // Left Ellipse Dot for left side heavy Pagination.
    return [...leftPaginationItems, "rd", pagesCount];
  } else if (leftBound > 2 && rightBound + 2 >= pagesCount) {
    let rightPaginationItems = [];
    let rightStart = pagesCount - 4;
    for (let i = rightStart; i <= pagesCount; i++) {
      rightPaginationItems.push(i);
    }
    // Right Ellipse Dot for right side heavy Pagination.
    return [1, "ld", ...rightPaginationItems];
  } else {
    let middlePaginationItems = [];
    for (let i = leftBound; i <= rightBound; i++) {
      middlePaginationItems.push(i);
    }
    // When the current active page is in the middle of all page items withn leftBound and rightBound.
    return [1, "ld", ...middlePaginationItems, "rd", pagesCount];
  }
}

function CPagination({
  pagesCount,
  currentActivePage,
  setcurrentActivePage,
}) {
  let array = getPaginationItems(pagesCount, currentActivePage);
  function onActivePageChange(newPage) {
    if (newPage === "ld") {
      setcurrentActivePage(Math.ceil((currentActivePage + 1) / 2));
    } else if (newPage === "rd") {
      setcurrentActivePage(Math.floor((pagesCount + currentActivePage) / 2));
    } else if (newPage === "first") {
      setcurrentActivePage(1);
    } else if (newPage === "next") {
      if (currentActivePage === pagesCount) {
        return;
      }
      setcurrentActivePage(currentActivePage + 1);
    } else if (newPage === "prev") {
      if (currentActivePage === 1) {
        return;
      }

      setcurrentActivePage(currentActivePage - 1);
    } else if (newPage === "last") {
      setcurrentActivePage(pagesCount);
    } else {
      setcurrentActivePage(newPage);
    }

  }
  return (
    <div className="text-center d-flex justify-content-center">
      <Pagination>
        <Pagination.First
          variant="danger"
          onClick={() => onActivePageChange("first")}
        />
        <Pagination.Prev onClick={() => onActivePageChange("prev")} />
        {array.map((pageElem, index) => {
          // Left Ellipse and Right Ellipse
          return pageElem === "ld" || pageElem === "rd" ? (
            <Pagination.Ellipsis
              key={index}
              onClick={() => onActivePageChange(pageElem)}
            />
          ) : (
            <Pagination.Item
              key={index}
              onClick={() => onActivePageChange(pageElem)}
              active={pageElem === currentActivePage}
            >
              <span>{pageElem}</span>
            </Pagination.Item>
          );
        })}
        <Pagination.Next onClick={() => onActivePageChange("next")} />
        <Pagination.Last onClick={() => onActivePageChange("last")} />
      </Pagination>
    </div>
  );
}

export default CPagination;
