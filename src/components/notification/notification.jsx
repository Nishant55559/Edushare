
import NotificationBody from "./notification_body";
import ProfileCard from "../home/profile snippet/ProfileCard";
import ProjectStats from "../home/profile snippet/ProjectStats";
function Notification(){

        return(
            <div style={{display:"flex",flexDirection:"row",marginTop:"10vh",marginLeft:"5vh",width:"100vw", gap:"10px"}}>
                <ProfileCard/>
                <NotificationBody/>

            </div>
        );
};

export default Notification;