import { useState,React } from "react";
import './content.css';
function Profilefinder()
{
   const [username,setname]=useState("");
   const [userdata,setdata]=useState(null);
   const [error,seterror]=useState(null);
   const get_profile=async ()=>
   {
    try{
    const response=await fetch(`https://api.github.com/users/${username}`)
    if (!response.ok) {
        throw new Error("User not found");
      }
      seterror(null);
      const data = await response.json();
      console.log(data)
      setdata(data);
    } catch (err) {
      seterror(err.message);
      setdata(null)
    }
}

   return(
    <div className="main-content">
   <input
        type="text"
        placeholder="Enter GitHub Username"
        value={username}
        onChange={(e) => setname(e.target.value)}
      />
      <div>
      <button className="button-19" onClick={get_profile}>Search</button>
      </div>
      {error && <p>{error}</p>}
      {userdata && 
      <div className="inner-content"><p><img src={userdata.avatar_url}/></p>
      <h3>{userdata.name}</h3>
      <p>{userdata.bio}</p>
      <p>Followers : {userdata.followers}</p>
      <p>Repositories : {userdata.public_repos}</p>
      <p><a href={userdata.html_url} target="_blank" rel="noopener noreferrer">LINK TO VIEW THE PROFILE</a></p>
      </div>}
    </div>
   )

}
export default Profilefinder;