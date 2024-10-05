import NavBar from "../_component/moderator-navbar";
import { EventManagement } from "./_component/event-management";

export default function Event() {
  return (
    <>
      <NavBar links={["Quản lý sự kiện"]} />
      <div className="">
        <EventManagement />
      </div>
    </>
  );
}
