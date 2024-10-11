import NavBar from "../_component/moderator-navbar";
import DetailEvent from "./_component/detail-event";

export default function Event() {
  return (
    <>
      <NavBar links={["Quản lý sự kiện - Nội dung sự kiện"]} />
      <div>
        <DetailEvent />
      </div>
    </>
  );
}
