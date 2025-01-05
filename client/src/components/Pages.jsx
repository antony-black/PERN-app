import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Pagination } from "react-bootstrap";

import { Context } from "../main";

const Pages = observer(() => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalGoodCount / device.limit);
  const pages = [];
  // const pages = [1,2,3,4,5];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={device.page === page}
          onClick={() => device.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
