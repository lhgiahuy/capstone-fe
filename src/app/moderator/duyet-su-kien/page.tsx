import DetailEvent from "./_component/detail-event";

import NavBar from "../_component/moderator-navbar";

export default function Event() {
  return (
    <>
      <NavBar links={["Nội dung sự kiện"]} />
      <div>
        <DetailEvent />
      </div>
    </>
  );
}
